---
title: SSH Configuration
tags: secure-shell devops
---
If you use [OpenSSH](http://www.openssh.com) to connect to [SSH](https://tools.ietf.org/html/rfc4251) servers on a regular basis, you may benefit from using an [SSH configuration file](http://www.openbsd.org/cgi-bin/man.cgi/OpenBSD-current/man5/ssh_config.5). This will help you to shorten long commands:

```bash
ssh -p 2222 alykhan@student.cs.uwaterloo.ca
```

into an easily customizable shortcut:

```bash
ssh cs
```

This is accomplished by creating a text file located at `~/.ssh/config` on your local machine with a few pieces of information and ensuring a specific set of permissions are applied to that file.

## Setup Instructions

* Make the `~/.ssh/` directory if it does not already exist:

```bash
mkdir ~/.ssh/
```

* Set the [permissions](https://en.wikipedia.org/wiki/File_system_permissions#Symbolic_notation) for the `~/.ssh/` directory such that it is readable, writeable, and executable for **only** the current user (i.e. `rwx------`):

```bash
chmod 700 ~/.ssh/
```

* Create a text file at `~/.ssh/config` following this example format:

```
Host cs
    HostName student.cs.uwaterloo.ca
    User alykhan
    Port 2222
```
Note that this file must also meet specific permissions requirements as specified by the [`ssh_config` man page](http://www.openbsd.org/cgi-bin/man.cgi/OpenBSD-current/man5/ssh_config.5) (i.e. `rw-------`):

> `~/.ssh/config` — Because of the potential for abuse, this file must have strict permissions: read/write for the user, and not accessible by others.

```bash
chmod 600 ~/.ssh/config
```

## Usage

Congratulations! You may now connect to the SSH host via:

```bash
ssh cs
```

Feel free to add multiple `Host` entries to the `config` file, to have quick access to different `HostNames` via shortcuts like `ssh website`, `ssh work`, etc. Each of these entries may also have different `User`, `Port`, and other configuration values.
