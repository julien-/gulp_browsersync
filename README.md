
To be more productive we will use the task manager **[Gulp](https://gulpjs.com/)** and the tool **[BrowserSync](https://www.browsersync.io/)**. According our configuration ( _gulpfile.js_ ) :

-   **Gulp**  triggers your .**SCSS** files changes and each time you save one of this files,  it will compile into  **CSS**
-   **BrowserSync**  triggers **CSS** changes and inject them into your browsers

With this combination, we don't need to compile manually every time we want to test our website.  **BrowserSync** is a "magic" tool for front developers: if you have two browsers opened in different devices, both will be impacted by changes. In fact you will edit your  **SCSS** file, you will save it and your browser will apply changes without switch window and refresh. You can now focus only on your code.

# Installation
```
cd <YOUR_THEME_DIR>
git clone git@github.com:julien-/gulp_browsersync.git
cd gulp_browsersync
npm install
```

# Usage
We don't want to have .**SCSS** files in production. So we can choose 
 - To create a new Github repository specific for front sources
 - To create a branch in the current repository that will NEVER had to be merged with develop/master

I choose the second option to keep link between Front-end and Back-end repositories.
<details><summary>The "gulp" branch does not exist</summary><p>

```
mkdir src
git remote get-url --all origin | git clone `xargs` src
rm -rf src/*
cd src
git checkout -b gulp
git add .
git commit -m "GULP: Remove useless files"
```
</p></details>
<details><summary>The "gulp" branch exists</summary><p>

```
(cd .. && git remote get-url --all origin && cd gulp_browsersync/) | git clone `xargs` src --branch gulp
```
</p></details>
If needed, create your `src/config.local.json` to override the `src/config.project.json` that overrides `config.default.json`.

## Run

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

# Drupal usage
To not have troubles of Fonts, update your settings.php by adding the port to your `$base_url` _(do not hesitate to chmod 777 your settings.php in development environment)_ :
In case of port 8081, `$base_url  = 'https://toto.com/build';` begins `$base_url  = 'https://toto.com:8081/build';`

>  If you want to access to **https://toto:8081/build**  gulp have to be running
<details><summary>Are your ports free?</summary><p>
Cloud9 open only 8080 8081 and 8082 ports. So you have to use only one of this ports.

```
sudo netstat -tulpn | grep 8081
```
</p></details>

# Submit your changes
Commit your changes in the worktree (gulp branch) and don't forget to commit the .**CSS** changes in your "feature" branch project (without the .**SCSS** files)