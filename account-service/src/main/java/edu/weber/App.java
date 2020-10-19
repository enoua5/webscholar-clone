package edu.weber;

import org.springframework.cloud.client.SpringCloudApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * Hello world!
 *
 */

@SpringCloudApplication
@EnableDiscoveryClient
public class App
{
    public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
    }
}
