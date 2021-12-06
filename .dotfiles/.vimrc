set nocompatible " Not compatible wiht vi
filetype off			"Helps force plugins to load  
filetype plugin indent on	"For plugins to load correctly
let mapleader = "." 		"Mapleaderkey to .
set encoding=UTF-8
set belloff=all

filetype plugin indent on

autocmd! FileType c,cpp,java,php call CSyntaxAfter()

" Start NERDTree and leave the cursor in it.
" autocmd VimEnter * NERDTree
" Start NERDTree and put the cursor back in the other window.
autocmd VimEnter * NERDTree | wincmd p

" Cursor In InsertMode
autocmd InsertEnter * set cul
autocmd InsertLeave * set nocul

" Autocomplete with dictionary words when spell check is on
" set complete+=kspell

set scrolloff=4
set smartindent
set tabstop=2
set shiftwidth=2
set expandtab

" Open new split panes to right and bottom, which feels more natural
set splitbelow
set splitright

" Basic Settings
set encoding=utf-8
set number	
set ruler
set hidden

" Search Bindings
set hlsearch			
set incsearch
set ignorecase

" Key Bindings REMAPS
" Open terminal with current directory
map <C-t> :let $VIM_DIR=expand('%:p:h')<CR>:bel terminal<CR>cd $VIM_DIR<CR> <C-w>20+

" NerdTree 
nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <leader>t :NERDTreeToggle<CR>
nnoremap <leader>f :NERDTreeFind<CR>
nnoremap <leader>r :NERDTree<CR>

" Quicker window movement
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-h> <C-w>h
nnoremap <C-l> <C-w>l

" Save and Exit
noremap <leader>w :w<CR> 		
noremap <leader>qq :q!<CR> 
noremap <leader>l :let @/=''<CR>

inoremap jj <Esc>
inoremap <leader>w <Esc>:w<CR> 
inoremap <leader>qq <Esc>:q!<CR>

" Find Files 
nnoremap <silent> <C-f> :Rg<CR>
nnoremap <silent> <Leader>f :Files<CR>

nnoremap <silent> <Leader>b :Buffers<CR>
nnoremap <silent> <Leader>/ :BLines<CR>
nnoremap <silent> <Leader>' :Marks<CR>
nnoremap <silent> <Leader>g :Commits<CR>
nnoremap <silent> <Leader>H :Helptags<CR>
nnoremap <silent> <Leader>hh :History<CR>
nnoremap <silent> <Leader>h: :History:<CR>
nnoremap <silent> <Leader>h/ :History/<CR> 

"::::: PLUGINS :::: 

call plug#begin('~/.vim/plugged')

Plug 'prettier/vim-prettier', { 'do': 'yarn install --frozen-lockfile --production' }


Plug 'elzr/vim-json'
Plug 'itchyny/lightline.vim'
Plug 'vim-airline/vim-airline'

Plug 'HerringtonDarkholme/yats.vim'
Plug 'tpope/vim-fugitive'
Plug 'tpope/vim-rhubarb'

Plug 'kristijanhusak/defx-git'

" Search Files
Plug 'junegunn/fzf.vim'
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }

" Snippet and Additional Text Editing Support
Plug 'neoclide/coc.nvim', { 'branch': 'release' }

" NerdTree Plugins
Plug 'preservim/nerdtree'
Plug 'Xuyuanp/nerdtree-git-plugin' "showing git status flags

" Themes
Plug 'patstockwell/vim-monokai-tasty'
Plug 'dracula/vim', { 'as': 'dracula' }

call plug#end()


" Set ColorScheme
colorscheme dracula

" Set Background Transparent
hi Normal ctermbg=NONE

"#if type rg &> /dev/null; then
"#  export FZF_DEFAULT_COMMAND='rg --files'
"#  export FZF_DEFAULT_OPTS='-m --height 50% --border'
"#fi
