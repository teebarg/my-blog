---
title: Upload and Dump Mongo DB
date: '2022-07-20'
tags: ['Mongo', 'Docker']
draft: false
summary: Upload and Dump data from your mongo db
images: []
layout: PostNew
canonicalUrl: canonical/url
postImg: /static/images/mongo.png
authors: ['beaf']
readTime: '3 min'
category: Backend
---

### Overview

MongoDB is an interesting tool. Dead simple to create and modify records (or, "documents") that are basically pure JSON goodness, juxtaposed with at times tools or commands that make you scratch your head in utter confusion and/or disbelief.

To help prevent me from having to re-figure this out a few more times, here's a quick how-to on how to back up and restore a MongoDB database, all collections included. The process is unfortunately a little less elegant as compared to PostgreSQL or MariaDB, but hopefully you don't have to do it too often.

## Create a database dump

We can use the following command to create a dump of your entire database, all collections included. Unlike with most other database solutions, the dump will be a bunch of individual files, and so we can't easily rely on shell piping to get this somewhere directly on your docker host machine. Instead we'll simply dump the files to somewhere within the docker container, and then docker cp them out.

```bash
❯ docker exec -i <container_name> /usr/bin/mongodump --username <username> --password <password> --authenticationDatabase admin --db <database_name> --out /dump
```

Now that we have the database dump files, we need a way to get them out of the docker container. Let's copy the files out of the container:

```bash
❯ docker cp <container_name>:/dump ~/Downloads/dump
```

That's it, we finally have our files. Now we can basically do the exact opposite in our new container. Let's do that next.

## Restoring

Just like before, we should first make the dumped database files available within the docker container.

```bash
> docker cp ~/Downloads/dump <container_name>:/dump
```

Now that the dump files are available within the container, run the following command to have everything be imported.

```bash
❯ docker exec -i <container_name> /usr/bin/mongorestore --username <username> --password <password> --authenticationDatabase admin --db <database_name> /dump/<database_name>
```

That's it! While not as straight-forward as with some other database solutions, it's not too difficult fortunately.

I hope this guide was able to help you. I certainly will be re-visiting this myself once I inevitably end up forgetting how to do this stuff.

Thank you.
