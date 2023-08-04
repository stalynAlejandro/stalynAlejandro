stty -ixon

plugins=(sudo zsh-autosuggestions git)

if [[ `uname` == "Darwin" ]]; then
  export ZSH="/Users/csaav/.oh-my-zsh"
else
  export ZSH="/home/sa/.oh-my-zsh"
  alias nv="nvim"
  alias fontlist="fc-list : family | tr ',' '\n' | sort -u"
  alias mongostatus="sudo systemctl status mongod"
  alias mongostart="sudo systemctl start mongod"
  alias rmswp="find . -type f -name '*.swp' -exec rm -f {} \;"
  alias gunzip="tar xzvf"
  alias openports="netstat -tulpn | grep LISTEN"
  alias cm="cmatrix"
  alias c:regts="~/tsystems/registro-electronico/"
  alias c:regpro="~/Projects/registro-electronico-2.0/"
  alias c:jw="~/Projects/JWTrivial"
  alias c:jwgame="~/Projects/JWTrivial/jwgame/"
  alias c:jwback="~/Projects/JWTrivial/jwback/"
  alias c:sst="~/Projects/AWS-Projects/sst-app/"

  alias run:android="cd ~/android-studio/bin && ./studio.sh"
  alias nf="neofetch"
  alias ht="htop"
  alias fo="xdg-open ."
  alias foc="xdg-open . && exit"
  alias vo="code ."
  alias voc="code . && exit"
  alias to="gnome-terminal"
  alias toc="gnome-terminal && exit"
  alias ch="google-chrome --disable-features=InfiniteSessionRestore --new-window --app"
  alias rb="reboot"
  alias pw="poweroff"
  alias srb="sudo reboot"
  alias spw="sudo poweroff"
  alias hh="history -n | tail -70  > h.txt && less h.txt; rm -rf h.txt"

  alias gs="git st"
  alias gst="git st"
  alias gci="git ci"
  alias gcim="git ci -m"
  alias gco="git co"
  alias gbr="git br"
  alias gll="git ll"
  alias gup="git up"
  alias grst.="git rst ."
  alias grst="git restore"
  alias gpsu="git psu"
  alias gadd="git add"
  alias gpull="git pull"
  alias gpush="git push"
  alias glog="git log"
  alias glogg="git logg"
  alias gprn="git prn"
  alias gdifft="git difftool"
  alias gdiff="git-icdiff | less"
  alias gdiffc="git-icdiff | cat"
  alias gssh="git config --global user.email saavalencia97@gmail.com && ssh-add ~/.ssh/gitkey && gemail"
  alias gemail="git config user.email"
  alias gname="git config user.name"

  alias nr='npm run'
  alias nrdev="npm run dev"
  alias nrtest="npm run test"
  alias nrstart="npm run start"
  alias nrbuild="npm run build"
  alias nrstory="npm run storybook"
  alias nrtest:coverage="npm run test-coverage"

  alias adb:list='emulator -list-avds'
  alias adb:debug='adb shell input keyevent 82'
  alias aws:configure="aws configure"
  alias aws:config="cat ~/.aws/config"
  alias aws:region="aws configure get region"
  alias aws:ec2="aws ec2 describe-vpcs | cat"
  alias aws:credentials="cat ~/.aws/credentials"
  alias cdk:init="echo cdk init --language typescript"
  alias aws:identity="aws sts get-caller-identity | cat"
  alias aws:bootstrap="echo cdk bootstrap aws://ACCOUNT-NUMBER/REGION"

  alias se="echo '|   Commit type         | Emoji              |  
|-----------------------|--------------------|  
| New feature           | :sparkles:         | 
| Bugfix                | :bug:              |  
| Documentation         | :books:            |  
| Tests                 | :rotating_light:   |  
| Adding a test         | :white_check_mark: |  
| Refactor code         | :hammer:           |  
| Removing code/files   | :fire:             |  
| Security              | :lock:             |  
| Upgrading dependencies| :arrow_up:         |  
| Translation           | :alien:            |  
| Text                  | :pencil:           |  
| Deploying stuff       | :rocket:           |  
| Package.json in JS    | :package:          |  
| Breaking changes      | :boom:             |  
| Code review changes   | :ok_hand:          |'" 
fi

export FZF_DEFAULT_COMMAND='rg'
if type rg &> /dev/null; then
  export FZF_DEFAULT_COMMAND='rg --files'
  export FZF_DEFAULT_OPTS='-m --height 50% --border'
fi

#ZSH_THEME="gallois"
ZSH_THEME="zhann"
source $ZSH/oh-my-zsh.sh

export EDITOR=/usr/bin/vim  
export VISUAL=/usr/bin/vim
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:/home/sa/.config/lsp/lua-language-server/bin
export PATH=$PATH:$HOME/Programs/aseprite/build/bin
export HOSTALIASES=~/.hosts


DISABLE_AUTO_TITLE="true"
JAVA_HOME=/opt/android-studio-2022.2.1/android-studio/jre
PATH=$PATH:$HOME/bin:$JAVA_HOME/bin
export JAVA_HOME
export JRE_HOME
export PATH
export PAGER=cat

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
