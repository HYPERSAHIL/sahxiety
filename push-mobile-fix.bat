@echo off
echo ===================================
echo GitHub Push Script for Mobile Fix
echo ===================================

REM Set the path to Git
set GIT_PATH="C:\Program Files\Git\bin\git.exe"

echo Adding all files...
%GIT_PATH% add .

echo Committing changes...
%GIT_PATH% commit -m "Fix mobile header and spacing issues"

echo Pushing to GitHub...
%GIT_PATH% push

echo ===================================
echo Done!
echo ===================================
pause
