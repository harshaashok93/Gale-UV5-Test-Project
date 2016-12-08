Hain-LiveClean-UI
=================

This repository holds the code for Hain's LiveClean UI project - powered by Unchained v5.


Deployed instances
------------------


|     DEV     |      QA     |      UAT     |      MASTER     |
|-------------|-------------|--------------|-----------------|
| [![Build Status](http://ci.hain.gale43labs.com/buildStatus/icon?job=Hain - LiveClean - UI/develop)](http://gale-unchained-ci-jenkins.gale43labs.com/job/Hain%20-%20LiveClean%20-%20UI/job/develop/) | [![Build Status](http://ci.hain.gale43labs.com/buildStatus/icon?job=Hain - LiveClean - UI/QA)](http://gale-unchained-ci-jenkins.gale43labs.com/job/Hain - LiveClean - UI/job/QA) | [![Build Status](http://ci.hain.gale43labs.com/buildStatus/icon?job=Hain - LiveClean - UI/UAT)](http://gale-unchained-ci-jenkins.gale43labs.com/job/Hain - LiveClean - UI/job/UAT) |    Not Setup    |


| ENV      | URL                                                                                                      |
|----------|----------------------------------------------------------------------------------------------------------|
| DEV      | [https://hain-liveclean-ui-dev.galepartners.com/](https://hain-liveclean-ui-dev.galepartners.com/)       |
| QA       | [https://hain-liveclean-ui-qa.galepartners.com/](https://hain-liveclean-ui-qa.galepartners.com/)         |
| UAT      | [https://hain-liveclean-ui-uat.galepartners.com/](https://hain-liveclean-ui-uat.galepartners.com/)       |
| MASTER   | Not Setup                                                                                                |


##Environment Passwords:


###htpasswd authentication
  Username : ``admin@example.com``

  Password : ``}t7PnA]u``

###For the CMS

  Username : `admin@example.com`

  Password : `test123`


##First time Installation Instructions


1. Fork and clone this repository, and cd into this repository folder.

2. Make sure to clear any existing vagrant setup

  ```
  vagrant destroy
  ```

3. Run

    ```
    cp src/server/config/settings/.env.example src/server/config/settings/.env
    vagrant up
    ```

    Note: The copy command copies a set of environment variables. This should work out of box with our setup.

4. Run the following commands:

    ```
    vagrant ssh
    ```

5. Create a new Private/Public SSH key inside your vagant box.

    ```
    ssh-keygen -t rsa -b 2048
    ```

    Note: Please do not enter any password. Hit enter without entering any data for all three prompts.

6. Copy your public key, by copying the output of the below command

    ```
    cat ~/.ssh/id_rsa.pub
    ```

7. Add this public key to your GitHub profile. Refer [here](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) for instructions on how to add it to your GitHub profile (you can ignore the copy step, since we have already copied).

8. Execute this command next:

    ```
    ssh-keyscan github.com >> ~/.ssh/known_hosts
    ```

9. Execute the below commands to set everything up

    ```
    cd /home/vagrant/project
    docker-compose up -d database
    docker-compose down
    docker-compose up -d
    docker-compose exec app pip install -r src/server/requirements/dev.txt
    docker-compose exec app python src/server/manage.py migrate
    docker-compose restart app
    docker-compose exec app python src/server/manage.py createsuperuser
    ```

##To build JS and CSS

Execute the following commands in your hosts Terminal (not vagrant) from the project folder
```
npm install
gulp build
```

##To start the Django server

1. Get inside Vagrant:

    ```
    vagrant ssh
    ```
    
2. Execute the following commands:

    ```
    cd /home/vagrant/project
    docker-compose up -d
    docker-compose exec app python src/server/manage.py rebuild_live_clean_index
    docker-compose exec app python src/server/manage.py runserver 0:8000
    ```
    This builds the search index and starts the server

3. Navigate to [http://localhost:8000/cms](http://localhost:8000/cms) on your local browser.


## Restoring from a database backup and media backup

1. Get inside Vagrant

    ```
    vagrant ssh
    ```

2. Execute a script to download and install DB and Media dump

    ```
    cd /home/vagrant/project
    bash .build/syncQA.sh
    ```
## Clearing the project Solidus cache

1. Go to the following URL on QA

    ```
    https://hain-liveclean-ui-qa.galepartners.com/unchained/ecommerce/api/v1/clear-cache/
    ```
2. Go to the following URL on local

    ```
    https://localhost:8000/unchained/ecommerce/api/v1/clear-cache/
    ```
