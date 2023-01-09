#!/bin/bash
########################################################
# Bash script to install apps on a new system (Ubuntu) #
# Written by Stalyn Alejandro                          # 
########################################################

# Update packages and upgrade system
echo "\n\tUPDATE THE APT ... "
sudo apt-get update -y

echo "\n\nINSTALLING GIT - STALYN ALJEANDRO (saavalencia97@gmail.com) ... "
sudo apt-get install git -y
git config --global user.name STALYN ALEJANDRO
git config --global user.email saavalencia97@gmail.com

echo "\n\nINSTALLING NODE 18.x LTS ... "
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
sudo apt install npm -y

echo "\n\nINSTALLING VIM EDITORS ..."
sudo apt-get install vim -y
sudo apt-get install neovim -y

echo "\n\nINSTALLING VIMPLUG ... "
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

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
