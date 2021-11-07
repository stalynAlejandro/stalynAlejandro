set nocompatible " Not compatible wiht vi
filetype off			"Helps force plugins to load  
filetype plugin indent on	"For plugins to load correctly
let mapleader = "." 		"Mapleaderkey to .

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

"::::: PLUGINS :::: 

call plug#begin('~/.vim/plugged')
Plug 'elzr/vim-json'
Plug 'itchyny/lightline.vim'
Plug 'vim-airline/vim-airline'
"Plug 'MaxMEllon/vim-jsx-pretty'
Plug 'HerringtonDarkholme/yats.vim'
Plug 'patstockwell/vim-monokai-tasty'
Plug 'tpope/vim-fugitive'
Plug 'tpope/vim-rhubarb'
Plug 'kristijanhusak/defx-icons'
Plug 'kristijanhusak/defx-git'

" Snippet and Additional Text Editing Support
Plug 'neoclide/coc.nvim', { 'branch': 'release' }

" Browse Files
Plug 'Shougo/defx.nvim'
Plug 'roxma/nvim-yarp'
Plug 'roxma/vim-hug-neovim-rpc'


" NerdTree Plugins
Plug 'preservim/nerdtree'
Plug 'Xuyuanp/nerdtree-git-plugin' "showing git status flags
call plug#end()

" Allow italics
let g:vim_monokai_tasty_italic = 1                    " allow italics, set this before the colorscheme

" Set ColorScheme
colorscheme vim-monokai-tasty                         " set the colorscheme

" Set Background Transparent
hi Normal ctermbg=NONE
