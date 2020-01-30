


To be more productive we will use the task manager **[Gulp](https://gulpjs.com/)** and the tool **[BrowserSync](https://www.browsersync.io/)**. ( see _gulpfile.js_ ) :

-   **Gulp**  triggers your .**SCSS** files changes and each time you save one of this files,  it will compile into  **CSS**
-   **BrowserSync**  triggers **CSS** changes and inject them into your browsers

With this combination, we don't need to compile manually every time we want to test our website.  **BrowserSync** is a "magic" tool for front developers: if you have two browsers opened in different devices, both will be impacted by changes. In fact you will edit your  **SCSS** file, you will save it and your browser will apply changes without switch window and refresh. You can now focus only on your code.
#
We don't want to have .**SCSS** files in production. So we can choose 
 - To create a new Github repository specific for front sources
 - To create a branch in the current repository that will NEVER had to be merged with develop/master

I choosed the second option to keep link between Front-end and Back-end repositories.

# Git "gulp" branch exists in the project to clone ?

<details><summary>NO</summary><p>

```
cd %THEME_FOLDER%
git remote get-url --all origin | git clone `xargs` gulp
rm -rf gulp/**
cd gulp
git checkout -b gulp
git clone https:``//github.com/julien-/gulp_browsersync
mv gulp_browsersync/* .
rm -rf gulp_browsersync/
echo "config.default.json
config.local.json
gulpfile.js
package.json
node_modules"  > .gitignore
git add .
ll
```
Is there files to remove for the current branch "gulp" (for sample ".jenkinsfile") ? If no, you can commit
```
git commit -m "First commit: remove useless files."
```

# Set config files
1.  _config.**default**.json_ : original file from Library cloned ([https://github.com/julien-/gulp_browsersync](https://github.com/julien-/gulp_browsersync))
2.  _config.**project**.json_ : Overrides  _config.**default**.json._ Set default config for future builds for this project and for your colleagues.
3.  _config.**local**.json_ : Overrides  _config.**project**.json._ Non-versioned file, only used in your local environment

```
cp config.default.json config.project.json
c9 config.project.json
cp config.default.json config.local.json
c9 config.local.json
```
Adapt your _config.**project**.json_ data values. After that, remove from config.**local**.json the data already defined in config.**project**.json (in theory you just need to have "c9url" data in config.**local**.json).
`git commit -am "Adding config files."`
</p></details>

<details><summary>YES</summary><p>

```
cd %THEME_FOLDER%
git remote get-url --all origin | git clone `xargs` --branch gulp gulp
cd gulp
git clone https://github.com/julien-/gulp_browsersync
mv gulp_browsersync/* .
rm -rf gulp_browsersync/
```
</p></details>

## Set local config
```
echo '{
    "c9url" : "1234.vfs.cloud9.eu-west-1.amazonaws.com",
    "sourcemaps": false
}
' > config.local.json
c9 config.local.json
```
*Adapt your _config.**local**.json_ data values.*

<details><summary>Drupal developers</summary><p>
To not have troubles of Fonts, update your *settings.php* by adding the port to your `$base_url` _(do not hesitate to chmod 777 your settings.php in development environment)_ :

```
chmod 777 build/sites/default/settings.php
c9 build/sites/default/settings.php
```
```
$base_url = 'https://toto.com/%PROJECT_FOLDER%/build';
$base_url = 'https://toto.com:8081/%PROJECT_FOLDER%/build';
```
</p></details>

:warning: **If you want to access to your project on 8081 port (*default*) gulp have to be running** :warning:

<details><summary>Are your ports free?</summary><p>
Cloud9 open only 8080 8081 and 8082 ports. So you have to use one of this port 
```
sudo netstat -tulpn | grep 8081
```
If your 8081 port is used, you have to free it by updating your C9 Devops configuration according your profile installed (LAMP or Docker) :

LAMP : `sudo salt-call state.apply profiles.lamp`
DOCKER : `sudo salt-call state.apply profiles.docker`

OR maybe kill the process gulp non-stopped
```
pidof gulp
kill %YOUR_PROCESS_ID%
```
</p></details>

# Install gulp dependencies
Run the installation of gulp
```
npm install
```

# Run

```
gulp
```
<details><summary>Issue: command gulp does not exist</summary><p>

```
npm install --global gulp-cli
```
</p></details>

Open your URL in the 8081 port and you will use BrowserSync tool that allow you to inject your triggered CSS files without refreshing your browser (better to keep focus on code)
**Now you can develop your .SCSS code in the "src/scss" folder.**

# Submit your changes
Commit your changes in the worktree (gulp branch) and don't forget to commit the .**CSS** changes in your "feature" branch project (without the .**SCSS** files)



#
> In this documentation `c9` command is used in Cloud9 environment to open a file
