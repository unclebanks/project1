package com.servlet.project1;

import java.sql.Connection;
import java.sql.DriverManager;

public class JDBCOneTime {
    private static Connection conn;
    private static String url, username, password;

    public JDBCOneTime() {
        super();
        start();
    }

    private static void start() {
        url = "jdbc:oracle:thin:@java-react.cvtq9j4axrge.us-east-1.rds.amazonaws.com:1521:ORCL";
        username = "admin";
        password = "12345678";
    }

    public static Connection getConn() {
        if (conn == null) {
            setConn();
        }
        return conn;
    }

    private static void setConn() {
    	JDBCOneTime.start();

        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            conn = DriverManager.getConnection(url, username, password);
        } catch (Exception e) {
        }
    }

}
