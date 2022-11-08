---
title: How To Use ps, kill, and nice to Manage Processes in Linux
date: '2022-04-11'
tags: ['Devops']
draft: false
summary: A Linux server, like any modern computer, runs multiple applications. These are referred to and managed as individual processes.
images: []
layout: PostNew
canonicalUrl: canonical/url
postImg: /static/images/how-to-use-ps-kill-and-nice-to-manage-processes-in-linux.webp
authors: ['beaf']
readTime: '6 min'
category: Devops
---

### Introduction

A Linux server, like any modern computer, runs multiple applications. These are referred to and managed as individual processes.

While Linux will handle the low-level, behind-the-scenes management in a process’s life-cycle – i.e., startup, shutdown, memory allocation, and so on – you will need a way of interacting with the operating system to manage them from a higher level.

In this guide, you will learn some fundamental aspects of process management. Linux provides a number of standard, built-in tools for this purpose.

You will explore these ideas in a Ubuntu 20.04 environment, but any modern Linux distribution will operate in a similar way.

## Step 1 – How To View Running Processes in Linux

You can see all of the processes running on your server by using the _top_ command:

```bash
top
```

```bash
> Output
top - 15:14:40 up 46 min,  1 user,  load average: 0.00, 0.01, 0.05
Tasks:  56 total,   1 running,  55 sleeping,   0 stopped,   0 zombie
Cpu(s):  0.0%us,  0.0%sy,  0.0%ni,100.0%id,  0.0%wa,  0.0%hi,  0.0%si,  0.0%st
Mem:   1019600k total,   316576k used,   703024k free,     7652k buffers
Swap:        0k total,        0k used,        0k free,   258976k cached

  PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND
    1 root      20   0 24188 2120 1300 S  0.0  0.2   0:00.56 init
    2 root      20   0     0    0    0 S  0.0  0.0   0:00.00 kthreadd
    3 root      20   0     0    0    0 S  0.0  0.0   0:00.07 ksoftirqd/0
    6 root      RT   0     0    0    0 S  0.0  0.0   0:00.00 migration/0
    7 root      RT   0     0    0    0 S  0.0  0.0   0:00.03 watchdog/0
    8 root       0 -20     0    0    0 S  0.0  0.0   0:00.00 cpuset
    9 root       0 -20     0    0    0 S  0.0  0.0   0:00.00 khelper
   10 root      20   0     0    0    0 S  0.0  0.0   0:00.00 kdevtmpfs
```

The first several lines of output provide system statistics, such as CPU/memory load and the total number of running tasks.

You can see that there is 1 running process, and 55 processes that are considered to be sleeping because they are not actively using CPU cycles.

The remainder of the displayed output shows the running processes and their usage statistics. By default, top automatically sorts these by CPU usage, so you can see the busiest processes first. top will continue running in your shell until you stop it using the standard key combination of Ctrl+C to exit a running process. This sends a kill signal, instructing the process to stop gracefully if it is able to.

An improved version of top, called htop, is available in most package repositories. On Ubuntu 20.04, you can install it with apt:

```bash
sudo apt install htop
```

After that, the htop command will be available:

```bash
htop
```

```bash
> Output
  Mem[|||||||||||           49/995MB]     Load average: 0.00 0.03 0.05
  CPU[                          0.0%]     Tasks: 21, 3 thr; 1 running
  Swp[                         0/0MB]     Uptime: 00:58:11

  PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command
 1259 root       20   0 25660  1880  1368 R  0.0  0.2  0:00.06 htop
    1 root       20   0 24188  2120  1300 S  0.0  0.2  0:00.56 /sbin/init
  311 root       20   0 17224   636   440 S  0.0  0.1  0:00.07 upstart-udev-brid
  314 root       20   0 21592  1280   760 S  0.0  0.1  0:00.06 /sbin/udevd --dae
  389 messagebu  20   0 23808   688   444 S  0.0  0.1  0:00.01 dbus-daemon --sys
  407 syslog     20   0  243M  1404  1080 S  0.0  0.1  0:00.02 rsyslogd -c5
  408 syslog     20   0  243M  1404  1080 S  0.0  0.1  0:00.00 rsyslogd -c5
  409 syslog     20   0  243M  1404  1080 S  0.0  0.1  0:00.00 rsyslogd -c5
  406 syslog     20   0  243M  1404  1080 S  0.0  0.1  0:00.04 rsyslogd -c5
  553 root       20   0 15180   400   204 S  0.0  0.0  0:00.01 upstart-socket-br
```

_htop_ provides better visualization of multiple CPU threads, better awareness of color support in modern terminals, and more sorting options, among other features. Unlike top, It is not always installed by default, but can be considered a drop-in-replacement. You can exit htop by pressing Ctrl+C as with top.

In the next section, you’ll learn about how to use tools to query specific processes.

## Step 2 – How To Use ps to List Processes

_top_ and _htop_ provide a dashboard interface to view running processes similar to a graphical task manager. A dashboard interface can provide an overview, but usually does not return directly actionable output. For this, Linux provides another standard command called _ps_ to query running processes.

Running _ps_ without any arguments provides very little information:

```bash
ps
```

```bash
> Output
  PID TTY          TIME CMD
 1017 pts/0    00:00:00 bash
 1262 pts/0    00:00:00 ps
```

This output shows all of the processes associated with the current user and terminal session. This makes sense if you are only running the _bash_ shell and this _ps_ command within this terminal currently.

To get a more complete picture of the processes on this system, you can run _ps aux_:

```bash
ps aux
```

```bash
> Output
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.2  24188  2120 ?        Ss   14:28   0:00 /sbin/init
root         2  0.0  0.0      0     0 ?        S    14:28   0:00 [kthreadd]
root         3  0.0  0.0      0     0 ?        S    14:28   0:00 [ksoftirqd/0]
root         6  0.0  0.0      0     0 ?        S    14:28   0:00 [migration/0]
root         7  0.0  0.0      0     0 ?        S    14:28   0:00 [watchdog/0]
root         8  0.0  0.0      0     0 ?        S<   14:28   0:00 [cpuset]
root         9  0.0  0.0      0     0 ?        S<   14:28   0:00 [khelper]
…
```

These options tell _ps_ to show processes owned by all users (regardless of their terminal association) in a more human-readable format.

By making use of pipes, you can search within the output of _ps aux_ using _grep_, in order to return the name of a specific process. This is useful if you believe it has crashed, or if you need to stop it for some reason.

```bash
ps aux | grep bash
```

```bash
> Output
sammy         41664   0.7  0.0 34162880   2528 s000  S     1:35pm   0:00.04 -bash
sammy         41748   0.0  0.0 34122844    828 s000  S+    1:35pm   0:00.00 grep bash
```

This returns both the grep process you just ran, and the bash shell that’s currently running. It also return their total memory and CPU usage, how long they’ve been running, and in the highlighted output above, their process ID. In Linux and Unix-like systems, each process is assigned a process ID, or PID. This is how the operating system identifies and keeps track of processes.

A quick way of getting the PID of a process is with the _pgrep_ command:

```bash
pgrep bash
```

```bash
> Output
1017
```

The first process spawned at boot, called init, is given the PID of “1”.

```bash
pgrep init
```

```bash
> Output
1
```

This process is then responsible for spawning every other process on the system. The later processes are given larger PID numbers.

A process’s parent is the process that was responsible for spawning it. Parent processes have a PPID, which you can see in the column headers in many process management applications, including top, htop and ps.

Any communication between the user and the operating system about processes involves translating between process names and PIDs at some point during the operation. This is why these utilities will always include the PID in their output. In the next section, you’ll learn how to use PIDs to send stop, resume, or other signals to running processes.

## Step 3 – How To Send Processes Signals in Linux

All processes in Linux respond to signals. Signals are an operating system-level way of telling programs to terminate or modify their behavior.

The most common way of passing signals to a program is with the kill command. As you might expect, the default functionality of this utility is to attempt to kill a process:

```bash
kill PID_of_target_process
```

This sends the TERM signal to the process. The TERM signal tells the process to please terminate. This allows the program to perform clean-up operations and exit smoothly.

If the program is misbehaving and does not exit when given the TERM signal, you can escalate the signal by passing the KILL signal:

```bash
kill -KILL PID_of_target_process
```

This is a special signal that is not sent to the program.

Instead, it is given to the operating system kernel, which shuts down the process. This is used to bypass programs that ignore the signals sent to them.

Each signal has an associated number that can be passed instead of the name. For instance, You can pass “-15” instead of “-TERM”, and “-9” instead of “-KILL”.

Signals are not only used to shut down programs. They can also be used to perform other actions.

For instance, many processes that are designed to run constantly in the background (sometimes called “daemons”) will automatically restart when they are given the HUP, or hang-up signal. The Apache webserver typically operates this way.

```bash
sudo kill -HUP pid_of_apache
```

The above command will cause Apache to reload its configuration file and resume serving content.

You can list all of the signals that are possible to send with kill with the -l flag:

```bash
kill -l
```

```bash
> Output
1) SIGHUP  2) SIGINT  3) SIGQUIT  4) SIGILL  5) SIGTRAP
6) SIGABRT  7) SIGBUS  8) SIGFPE  9) SIGKILL 10) SIGUSR1
11) SIGSEGV 12) SIGUSR2 13) SIGPIPE 14) SIGALRM 15) SIGTERM
```

Although the conventional way of sending signals is through the use of PIDs, there are also methods of doing this with regular process names.

The pkill command works in almost exactly the same way as kill, but it operates on a process name instead:

```bash
pkill -9 ping
```

pkill -9 ping

```bash
kill -9 `pgrep ping`
```

If you would like to send a signal to every instance of a certain process, you can use the _killall_ command:

```bash
killall firefox
```

The above command will send the TERM signal to every instance of firefox running on the computer.

## Step 4 – How To Adjust Process Priorities

Often, you will want to adjust which processes are given priority in a server environment.

Some processes might be considered mission critical for your situation, while others may be executed whenever there are leftover resources.

Linux controls priority through a value called niceness.

High priority tasks are considered less nice, because they don’t share resources as well. Low priority processes, on the other hand, are nice because they insist on only taking minimal resources.

When you ran top at the beginning of the article, there was a column marked “NI”. This is the nice value of the process:

```bash
top
```

```bash
[secondary_label Output]
Tasks:  56 total,   1 running,  55 sleeping,   0 stopped,   0 zombie
Cpu(s):  0.0%us,  0.3%sy,  0.0%ni, 99.7%id,  0.0%wa,  0.0%hi,  0.0%si,  0.0%st
Mem:   1019600k total,   324496k used,   695104k free,     8512k buffers
Swap:        0k total,        0k used,        0k free,   264812k cached

  PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND
 1635 root      20   0 17300 1200  920 R  0.3  0.1   0:00.01 top
    1 root      20   0 24188 2120 1300 S  0.0  0.2   0:00.56 init
    2 root      20   0     0    0    0 S  0.0  0.0   0:00.00 kthreadd
    3 root      20   0     0    0    0 S  0.0  0.0   0:00.11 ksoftirqd/0
```

Nice values can range between -19/-20 (highest priority) and 19/20 (lowest priority) depending on the system.

To run a program with a certain nice value, you can use the nice command:

```bash
nice -n 15 command_to_execute
```

This only works when beginning a new program.

To alter the nice value of a program that is already executing, you use a tool called _renice_:

```bash
renice 0 PID_to_prioritize
```

## Conclusion

Process management is a fundamental part of Linux that is useful in almost every context. Even if you aren’t performing any hands-on system administration, being able to chase down stuck processes and handle them carefully is very helpful.

Next, you may want to learn how to use _netstat_ and _du_ to monitor other server resources.
