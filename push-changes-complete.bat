@echo off
echo ===================================
echo GitHub Automated Push Script (Complete)
echo ===================================
echo.

REM Set paths to Git and GitHub CLI - Using standard installation paths
set GIT_PATH=C:\Program Files\Git\cmd\git.exe
if not exist "%GIT_PATH%" set GIT_PATH=C:\Program Files (x86)\Git\cmd\git.exe
if not exist "%GIT_PATH%" set GIT_PATH=C:\Program Files\Git\bin\git.exe

set GH_PATH=C:\Program Files\GitHub CLI\bin\gh.exe
if not exist "%GH_PATH%" set GH_PATH=C:\Program Files\GitHub CLI\gh.exe

REM Check if Git exists at the specified path
if not exist "%GIT_PATH%" (
    echo Git not found. Please install Git from https://git-scm.com/downloads
    echo Make sure to select the option to "Add Git to PATH" during installation.
    echo.
    echo After installation, you can run this script again.
    pause
    exit /b 1
)

REM Check if GitHub CLI exists at the specified path
if not exist "%GH_PATH%" (
    echo GitHub CLI not found. Please install GitHub CLI from https://cli.github.com/
    echo.
    echo After installation, you can run this script again.
    pause
    exit /b 1
)

REM Configure Git user information if not already set
echo Checking Git configuration...
for /f "tokens=*" %%a in ('"%GIT_PATH%" config --get user.email') do set GIT_EMAIL=%%a
if "%GIT_EMAIL%"=="" (
    echo Git email is not configured. Setting to ritayad@gmail.com
    "%GIT_PATH%" config --global user.email "ritayad@gmail.com"
    set GIT_EMAIL=ritayad@gmail.com
)

for /f "tokens=*" %%a in ('"%GIT_PATH%" config --get user.name') do set GIT_NAME=%%a
if "%GIT_NAME%"=="" (
    echo Git username is not configured. Setting to Sahil Yadav
    "%GIT_PATH%" config --global user.name "Sahil Yadav"
    set GIT_NAME=Sahil Yadav
)

echo Git configured with:
echo - Email: %GIT_EMAIL%
echo - Name: %GIT_NAME%
echo.

REM Check GitHub authentication
echo Checking GitHub authentication...
"%GH_PATH%" auth status >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo You are not authenticated with GitHub CLI.
    echo Please run '%GH_PATH% auth login' and follow the prompts.
    pause
    exit /b 1
)

REM Set GitHub username
set GITHUB_USERNAME=HYPERSAHIL
echo Using GitHub username: %GITHUB_USERNAME%

REM Set repository name
set REPO_NAME=sahxiety
echo Using repository name: %REPO_NAME%

REM Set the commit message
set COMMIT_MESSAGE=Optimize website for mobile devices
echo Using commit message: "%COMMIT_MESSAGE%"

REM Check if we're in a git repository
if not exist ".git" (
    echo This directory is not a Git repository.
    echo Attempting to initialize and set up the repository...

    REM Initialize git repository
    "%GIT_PATH%" init
)

REM Check if the repository exists on GitHub
echo Checking if repository %GITHUB_USERNAME%/%REPO_NAME% exists...
"%GH_PATH%" repo view %GITHUB_USERNAME%/%REPO_NAME% >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Repository %GITHUB_USERNAME%/%REPO_NAME% not found on GitHub.
    echo Please check the username and repository name.
    pause
    exit /b 1
)

REM Check if remote origin exists and set it if needed
for /f "tokens=*" %%a in ('"%GIT_PATH%" remote get-url origin 2^>nul') do set REMOTE_URL=%%a
if "%REMOTE_URL%"=="" (
    echo Adding remote origin...
    "%GIT_PATH%" remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
) else (
    echo Remote origin already exists: %REMOTE_URL%
    echo Continuing with existing remote...
)

REM Fetch the repository
echo Fetching repository...
"%GIT_PATH%" fetch

REM Set branch name to main (most common default branch)
set BRANCH_NAME=main
echo Using branch: %BRANCH_NAME%

REM Try to create the branch if it doesn't exist locally
"%GIT_PATH%" show-ref --verify --quiet refs/heads/%BRANCH_NAME%
if %ERRORLEVEL% NEQ 0 (
    echo Creating %BRANCH_NAME% branch...
    "%GIT_PATH%" checkout -b %BRANCH_NAME%
) else (
    echo Switching to %BRANCH_NAME% branch...
    "%GIT_PATH%" checkout %BRANCH_NAME%
)

REM Add all changes
echo Adding all changes...
"%GIT_PATH%" add .

REM Commit changes
echo Committing changes with message: "%COMMIT_MESSAGE%"
"%GIT_PATH%" commit -m "%COMMIT_MESSAGE%"
if %ERRORLEVEL% NEQ 0 (
    echo Failed to commit changes. This might be because there are no changes to commit.
    echo Continuing to push anyway in case there are already committed changes...
)

REM Push changes
echo Pushing changes to GitHub...
"%GIT_PATH%" push -u origin %BRANCH_NAME%

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================
    echo Success! Changes pushed to GitHub.
    echo ===================================
) else (
    echo.
    echo ===================================
    echo Warning: There might have been an issue with the push.
    echo Trying force push as a fallback...
    echo ===================================

    echo.
    echo Attempting force push...
    "%GIT_PATH%" push -f origin %BRANCH_NAME%

    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ===================================
        echo Success! Changes force-pushed to GitHub.
        echo ===================================
    ) else (
        echo.
        echo ===================================
        echo Error pushing changes. Please check the error message above.
        echo ===================================
    )
)

pause
