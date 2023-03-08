stty -ixon

if [[ `uname` == "Darwin" ]]; then
  export ZSH="/Users/csaav/.oh-my-zsh"
else
  export ZSH="/home/saav/.oh-my-zsh"
  alias c:reg="~/tsystems/registro-electronico/"
  alias c:jw="~/Projects/JWTrivial/jwgame"
  alias nf="neofetch"
  alias ht="htop"
  alias fo="xdg-open ."
  alias to="gnome-terminal"
  alias ch="google-chrome --new-window --app"
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
  alias grst="git rst"
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

ZSH_THEME="bira"
source $ZSH/oh-my-zsh.sh

plugins=(git)

export EDITOR=/usr/bin/vim  
export VISUAL=/usr/bin/vim
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

export HOSTALIASES=~/.hosts

DISABLE_AUTO_TITLE="true"
JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64/
PATH=$PATH:$HOME/bin:$JAVA_HOME/bin
export JAVA_HOME
export JRE_HOME
export PATH

#gemail
