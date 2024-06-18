sudo apt-get install neofetch -y
sudo apt-get install htop -y
sudo apt-get install btop -y
sudo apt-get install git -y
sudo apt-get install vim -y
sudo apt-get install neovim -y
sudo apt-get install dconf-editor -y
sudo apt-get install icdiff -y
sudo apt-get install gnome-shell-extension-manager -y
sudo apt-get install netstat -y
sudo apt-get install openjdk-17-jdk -y

(type -p wget >/dev/null || (sudo apt update && sudo apt-get install wget -y)) \
&& sudo mkdir -p -m 755 /etc/apt/keyrings \
&& wget -qO- https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
&& sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
&& sudo apt update \
&& sudo apt install gh -y

curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

git clone --depth 1 https://github.com/wbthomason/packer.nvim\
 ~/.local/share/nvim/site/pack/packer/start/packer.nvim

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

sudo apt-get install zsh -y
zsh --version
chsh -s $(which zsh)

sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

ln -s stalynAlejandro/.dotfiles/.zshrc .
ln -s stalynAlejandro/.dotfiles/.vimrc .
ln -s stalynAlejandro/.dotfiles/.gitconfig .

curl -fsSL https://ollama.com/install.sh | sh

gsettings set org.gnome.Terminal.Legacy.Settings headerbar false
gsettings set org.gnome.Terminal.Legacy.Settings default-show-menubar false

sudo apt autoremove
