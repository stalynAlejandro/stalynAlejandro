set nocompatible " Not compatible wiht vi
filetype off			"Helps force plugins to load  
filetype plugin indent on	"For plugins to load correctly
let mapleader = "." 		"Mapleaderkey to .

" Start NERDTree and leave the cursor in it.
" autocmd VimEnter * NERDTree
" Start NERDTree and put the cursor back in the other window.
autocmd VimEnter * NERDTree | wincmd p

" Cursor In InsertMode
autocmd InsertEnter * set cul
autocmd InsertLeave * set nocul

set smartindent
set tabstop=2
set shiftwidth=2
set expandtab

" Basic Settings
set number	
set ruler
set encoding=utf-8

" Search Bindings
set hlsearch			
set incsearch
set ignorecase
"set showmatch

" Key Bindings REMAPS
" Open terminal with current directory
map <C-t> :let $VIM_DIR=expand('%:p:h')<CR>:bel terminal<CR>cd $VIM_DIR<CR>

" NerdTree 
nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <leader>t :NERDTreeToggle<CR>
nnoremap <leader>f :NERDTreeFind<CR>
nnoremap <leader>r :NERDTree<CR>

" Save and Exit
noremap <leader>w :w<CR> 		
noremap <leader>q :q!<CR> 
noremap <leader>x :x<CR> 
noremap <leader>l :let @/=''<CR>

inoremap jj <Esc>
inoremap <leader>w <Esc>:w<CR> 
inoremap <leader>q <Esc>:q!<CR>
inoremap <leader>x <Esc>:x<CR>

"::::: PLUGINS :::: 

call plug#begin('~/.vim/plugged')
Plug 'elzr/vim-json'
Plug 'itchyny/lightline.vim'
Plug 'vim-airline/vim-airline'
Plug 'MaxMEllon/vim-jsx-pretty'
Plug 'HerringtonDarkholme/yats.vim'
Plug 'patstockwell/vim-monokai-tasty'

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
