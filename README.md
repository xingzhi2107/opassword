## Open Password


### tmp

* run mysql docker

```shell
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 -d mysql:5.7
```

* create db 
  ```mysql
  CREATE DATABASE {database_name} DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
  ```
