---
title: Update all Git submodules
tags: Git

---
https://devconnected.com/how-to-add-and-update-git-submodules/


update_bib.sh
```bash
#!/bin/bash
cd refs
git fetch
COMMITS=$(git log --oneline origin/main -3)
LATEST=${COMMITS:0:7}
git checkout -q $LATEST
```