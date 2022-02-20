---
title: Update all Git repositories
date: '2022-02-19T11:30:11+00:00'
permalink: /update-all-repos/
author: Satal

tags:
  - git
  - code
  - markdown
---

Over the years I've been working to move more and more of the content into version control. This spans both my development work and writing for this site and books/documents. However, as I switch between multiple computers where I will use one as my day-to-day driver and a second one for when I'm travelling to and from work, ensuring that I keep all the repos up to date can be an issue. I also use a varient of this on my phone to ensure everything is kept up to date on there as well.

For this reason, I have created a bash script that I can use on my laptops to iterate through all of my repos and pull down the latest commits. While this is not necessarily best practice, it suits my purposes and I imagine that it will be something that will be helpful for a large number of other people, hence creating this.

## The code

Below is the code that I use to go through my code folder and update any repos in there, personally I have this file saved as update_all_repos.sh.

```bash
#!/bin/bash
for d in ${PWD}/*/ ; do
    echo "$d"
    cd "$d"
    if [ -d .git ]; then
        git pull
    fi;
done
```

The first line of interest is `for d in ${PWD}/*/ ; do`, this starts off the for loop for each directory. The `${PWD}` is used to get the current directory, avoiding us hardcoding the current directory.

We then print out the directory name and change directory. While not necessary when running in the background, I found that having it print out the directory helps to make it clearer in the output if there were any errors.

> :warning: One thing that caught me out was not putting quotes around the directory. This led to the code not working occasionally when there was a space in the directory name.

While all of my folders in my source code directory are Git repositories, I thought it would be worth checking to see if it is a Git repo before I try and perform the pull. The `if [ -d .git ]; then` checks to see whether there is a `.git` folder in the directory and only, in that case, will it perform a pull.

## Running the script

To run the script, the first thing you will need to do is make the script executable

```bash
chmod +x update_all_repos.sh
```

Once this has been completed you're able to run the script by running `./update_all_repos.sh`.
