# node-concurrency

# Node.js Cluster vs Single Thread Performance Test

This report documents the results of a performance test between a single-threaded Node.js server and a multi-threaded (cluster) Node.js server on a local environment. The test aims to highlight the differences in handling high concurrency and compute-intensive tasks. The results clearly show the advantages of using the cluster module in Node.js when dealing with heavy loads.

## Environment Setup

- **Local Environment**: MacOS with 10 CPU cores.
- **Concurrency Testing Tool**: ApacheBench (ab).
- **Test URL**: `http://127.0.0.1`
- **Ports**:
  - **8001**: Single-threaded server
  - **8002**: Cluster-based multi-threaded server
- **Cluster Configuration**: `Creating 10 worker processes...`

## ApacheBench Test Command
To test each server, the following command was run:

```
ab -n 2000 -c 100 http://127.0.0.1:<port>/
```

## Test Results
Single-Threaded Server (Port 8001)

```
Concurrency Level:      100
Time taken for tests:   68.620 seconds
Complete requests:      2000
Failed requests:        0
Requests per second:    29.15 [#/sec] (mean)
Time per request:       3430.991 [ms] (mean)
Transfer rate:          3.47 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    5   2.0      6       8
Processing:    33 3407 232.6   3425    3495
Waiting:       15 1996 949.4   2018    3446
Total:         33 3412 232.8   3431    3499

Percentage of the requests served within a certain time (ms)
  50%   3431
  66%   3433
  75%   3435
  80%   3436
  90%   3441
  95%   3449
  98%   3498
  99%   3498
 100%   3499 (longest request)
```

Multi-Threaded (Cluster) Server (Port 8002)
```
Concurrency Level:      100
Time taken for tests:   7.955 seconds
Complete requests:      2000
Failed requests:        0
Requests per second:    251.41 [#/sec] (mean)
Time per request:       397.752 [ms] (mean)
Transfer rate:          30.20 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   2.9      0      19
Processing:    22  387  50.2    395     454
Waiting:       17  348  47.7    356     413
Total:         23  389  49.9    397     455

Percentage of the requests served within a certain time (ms)
  50%    397
  66%    401
  75%    403
  80%    405
  90%    411
  95%    416
  98%    423
  99%    429
 100%    455 (longest request)
```

## Analysis
```
Requests per Second:
  • The multi-threaded server handled 251.41 requests/sec compared to 29.15 requests/sec for the single-threaded server, clearly showing the cluster server’s efficiency under high concurrency.
Time per Request:
   • The average time per request for the single-threaded server was 3430.991 ms, while the multi-threaded server took only 397.752 ms per request, highlighting the ability of multiple worker processes to handle compute-intensive tasks concurrently.
Transfer Rate:
   • The cluster server achieved a transfer rate of 30.20 Kbytes/sec, far surpassing the single-threaded server’s 3.47 Kbytes/sec, demonstrating better resource utilization and response efficiency.
Connection Times:
   • The single-threaded server showed significantly higher processing and waiting times, with 90% of requests served within 3441 ms. The cluster server achieved much faster response times, with 90% of requests served within 411 ms.
```
