
sudo apt-get install git -y
sudo apt-get install vim -y
sudo apt-get install neovim -y

curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

git clone --depth 1 https://github.com/wbthomason/packer.nvim\
 ~/.local/share/nvim/site/pack/packer/start/packer.nvim

sudo apt-get install zsh -y
zsh --version
chsh -s $(which zsh)

sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

ln -s stalynAlejandro/.dotfiles/.zshrc .
ln -s stalynAlejandro/.dotfiles/.vimrc .
ln -s stalynAlejandro/.dotfiles/.gitconfig .

curl -fsSL https://ollama.com/install.sh | sh
