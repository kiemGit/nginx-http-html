import mysql.connector
import json
from datetime import datetime
from collections import defaultdict

def get_mysql_data():
    mydb = mysql.connector.connect(
        host="19.16.0.8",        # Replace with your MySQL server address
        user="hakim",     # Replace with your MySQL username
        password="1234567", # Replace with your MySQL password
        database="trs"  # R
    )

    cursor = mydb.cursor()

    # List of SQL queries
    queries = [
        """SELECT COUNT(trs.trs.PosInID) as Count_vehicle, trs.trs.ClassID, trs.trs.PosOutID, 
                trs.trs.IsCust, trs.trs.TimeIn as TimeIn, trs.trs.TimeOut, 
                SUM(trs.trs.RateOut) as Rate, mst.class.Vehicle
        FROM trs.trs 
        JOIN mst.class ON trs.trs.ClassID = mst.class.ID
        WHERE trs.trs.TimeIn >= '2024-10-01 00:00:00' 
            AND trs.trs.TimeIn <= '2024-11-01 00:00:00' 
            AND trs.trs.Status = 1 AND trs.trs.IsCust = 0
        GROUP BY YEAR(trs.trs.TimeIn), MONTH(trs.trs.TimeIn), trs.trs.ClassID, trs.trs.IsCust""",
        """SELECT 
            COUNT(trs.trs.PosInID) AS Count_vehicle,
            trs.trs.ClassID,
            trs.trs.IsCust,
            MIN(trs.trs.TimeIn) AS TimeIn, -- Use aggregate for non-grouped columns
            MIN(trs.trs.TimeOut) AS TimeOut, -- Use aggregate for non-grouped columns
            SUM(trs.trs.RateOut) AS Rate,
            mst.class.Vehicle
        FROM 
            trs.trs 
        JOIN 
            mst.class 
        ON 
            trs.trs.ClassID = mst.class.ID
        WHERE 
            trs.trs.TimeIn < CONCAT(DATE(NOW()), ' 00:00:00')
            AND trs.trs.Status = 0 
        GROUP BY 
            
            trs.trs.ClassID;"""
    ]

    # Container to store results
    all_data = defaultdict(list)

    for query in queries:
        cursor.execute(query)
        columns = [column[0] for column in cursor.description]
        data = [dict(zip(columns, row)) for row in cursor.fetchall()]
        json_str = json.dumps(data, default=str)
        parsed_data = json.loads(json_str)
        
        # You can group data by custom keys if needed, e.g., by table or query
        query_key = query[:30]  # Use a part of the query as a key (or a descriptive name)
        all_data[query_key].extend(parsed_data)

    # Example: Access specific query results
    for query_key, results in all_data.items():
        print(f"Results for query '{query_key}': {results}")

    # Example: Further group the data by year and month
    grouped_results = defaultdict(lambda: defaultdict(list))
    for result in all_data[queries[0][:30]]:  # Grouping results from the first query
        time_in = datetime.strptime(result['TimeIn'], "%Y-%m-%d %H:%M:%S")
        year_month = f"{time_in.year}-{time_in.month:02}"
        grouped_results[year_month][result['ClassID']].append(result)

    # Print grouped results
    for year_month, classes in grouped_results.items():
        print(f"\nYear-Month: {year_month}")
        for class_id, entries in classes.items():
            print(f"  ClassID {class_id}: {entries}")

    # Close cursor and connection
    cursor.close()
    mydb.close()

get_mysql_data()
