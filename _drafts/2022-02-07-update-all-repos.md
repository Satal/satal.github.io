---
title: Update all Git repositories
tags: Git

sidebar:
  nav: docs-en
---

Over the years I've been working to move more and mroe of the content into version control. This spans both my development work and writing for this site and books/documents. However, as I switch between multiple laptops where I will use one as my day-to-day driver and a second one for when I'm travelling to and from work, ensuring that I keep all the repos up to date can be an issue.

For this reason I have created a bash script that I can use on my laptops to iterate through all of my 

```bash
for d in ${PWD}/*/ ; do
    echo "$d"
    cd "$d"
    if [ -d .git ]; then
        git pull
    fi;
done
```

While all of my folders in my source code directory are Git repositories, I thought it would be worth checking to see if it is a Git repo before I try and perform the pull. The `if [ -d .git ]; then` checks to see whether there is a `.git` folder in the directory and only in that case will it perform a pull.

## Running the script

In order to run the script the first thing you will need to do is make the script executable

```bash
chmod +x update_all_repos.sh
```

Once this has been completed you're able to run the script by running `./update_all_repos.sh`. 