sudo apt-get install neofetch -y
sudo apt-get install htop -y
sudo apt-get install btop -y
sudo apt-get install git -y
sudo apt-get install vim -y
sudo apt-get install neovim -y
sudo apt-get install dconf-editor -y
sudo apt-get install icdiff -y

curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

git clone --depth 1 https://github.com/wbthomason/packer.nvim\
 ~/.local/share/nvim/site/pack/packer/start/packer.nvim

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
