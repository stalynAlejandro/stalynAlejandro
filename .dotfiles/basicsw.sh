#!/bin/bash
########################################################
# Bash script to install apps on a new system (Ubuntu) #
# Written by Stalyn Alejandro                          # 
########################################################

# Update packages and upgrade system
echo "\n\tUPDATE THE APT ... "
sudo apt-get update -y

sudo apt-get install git -y
# echo "Git Configuration"
# echo "Enter global user name for git"
# read GITUSER;
# git config --global user.name "${GITUSER}"
# echo "Enter global user email for git"
# read GITEMAIL;
# git config --global user.email "${GITEMAIL}"

echo "\n\nINSTALLGIN JAVA ...  "
sudo apt-get install default-jre -y
java --version

echo "\n\nINSTALLING MAVEN .. "
sudo apt-get install maven -y
mvn -version

echo "\n\nINSTALLING NODE 16.13.0 LTS ... "
curl -fsSL https://deb.nodesource.com/setup_16.13.0 | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt install npm -y

#echo "\n\nINSTALLING SNAP ... "
#sudo apt-get install snapd 

echo "\n\nINSTALLING VIM EDITORS ..."
sudo apt-get install vim -y
sudo apt-get install neovim -y

echo "\n\nINSTALLING VIMPLUG ... "
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

#echo "\n\n INSTALLING INTELLIJ EDITOR ... "
#sudo snap install intellij-idea-community --classic 

#echo "\n\n INSTALLING SNAP ANDROID STUDIO ... "
#sudo snap install android-studio --classic 

#echo "\n\n INSTALLING SNAP GNU IMAGE EDITOR ... "
#sudo snap install gimp 

echo "\n\n INSTALLING SNAP BLENDER .. "
#sudo snap install blender --classic 

echo "\n\n INSTALLING DOCKER ENGINE ... "
sudo apt-get install ca-certificates curl gnupg lsb-release -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
sudo apt-get update -y
sudo apt-get install docker.io -y 

echo "\n\n INSTALLING INSOMINA REST API ... "
#sudo snap install insomnia 

echo "\n\n INSTALLING SPOTIFY ... "
sudo snap install spotify

echo "\n\nINSTALLING POP SHELL ... "
sudo apt install node-typescript make -y
git clone https://github.com/pop-os/shell.git
cd shell
make local-install 
cd ~

echo "\n\nINSTALLING ZSH ... "
sudo apt-get install zsh -y
zsh --version
chsh -s $(which zsh)

echo "\n\nINSTALLING OH-MY-ZSH ... "
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

echo "\n\nINSTALLING HTOP AND NEOFETCH"
sudo apt-get install neofetch -y
sudo apt-get install htop -y

echo "MAKE THE TERMINAL WITHOUT HEADBAR"
gsettings set org.gnome.Terminal.Legacy.Settings headerbar false
gsettings set org.gnome.Terminal.Legacy.Settings default-show-menubar false

echo "\n\nAUTOREMOVE .. "
sudo apt autoremove

neofetch
