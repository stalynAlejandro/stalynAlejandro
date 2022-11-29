let mapleader = "." 		"Mapleaderkey to .
:syntax sync fromstart
autocmd BufEnter * :syntax sync fromstart

" Stop Recording (Temporary)
map q <Nop>

filetype off			"Helps force plugins to load  
filetype plugin indent on	"For plugins to load correctly

" Basic Settings
set nocompatible " Not compatible wiht vi
set number	
set ruler
set hidden
set smartindent
set belloff=all
set tabstop=2
set scrolloff=2
set shiftwidth=2
set encoding=UTF-8
set expandtab
set termguicolors
set showcmd " extra info at end of command line

" Open new split panes to right and bottom, which feels more natural
set splitbelow
set splitright
    
" Search Bindings
set hlsearch			
set incsearch
set ignorecase

" Cursor In InsertMode
autocmd InsertEnter * set cul
autocmd InsertLeave * set nocul

map <C-t> :let $VIM_DIR=expand('%:p:h')<CR>:bel terminal<CR>cd $VIM_DIR<CR> <C-w>5+

" NerdTree 
autocmd VimEnter * NERDTree | wincmd p

nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <leader>t :NERDTreeToggle<CR>
nnoremap <leader>f :NERDTreeFind<CR>
nnoremap <leader>r :NERDTree<CR>

" Copy And Paste
noremap <leader>Y "+y
noremap <leader>P "+p

" Quicker window movement
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-h> <C-w>h
nnoremap <C-l> <C-w>l

" Save and Exit
noremap <leader>w :w<CR> 		
noremap <leader>x :x<CR> 		
noremap <leader>qq :q!<CR> 
noremap <leader>qa :qa!<CR> 
noremap <leader>l :let @/=''<CR>

inoremap jj <Esc>
inoremap <leader>w <Esc>:w<CR> 
inoremap <leader>qq <Esc>:q!<CR>
inoremap <leader>qa :qa!<CR> 

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

" Git
map <silent> <C-g>s :Gdiffsplit<CR>
map <silent> <C-g>w :Gwrite<CR>
map <silent> <C-g>r :Gread<CR>

" Prettier
nnoremap <leader>p :call CocAction('runCommand','prettier.formatFile')<CR>
 
"::::: PLUGINS :::: 
call plug#begin('~/.vim/plugged')
  Plug 'mhinz/vim-startify'
  Plug 'prettier/vim-prettier', { 'do': 'yarn install --frozen-lockfile --production' }
  Plug 'itchyny/lightline.vim'
  Plug 'vim-airline/vim-airline'

  " Github 
  Plug 'tpope/vim-fugitive'

  " Colors
  Plug 'rrethy/vim-hexokinase', { 'do': 'make hexokinase' }

  " Search Files
  Plug 'junegunn/fzf.vim'
  Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }

  " Snippet and Additional Text Editing Support
  Plug 'neoclide/coc.nvim', { 'branch': 'release' }

  " NerdTree Plugins
  Plug 'preservim/nerdtree'
  Plug 'Xuyuanp/nerdtree-git-plugin' "showing git status flags

  " Themes
  Plug 'dracula/vim', { 'as': 'dracula' }
  Plug 'leafgarland/typescript-vim'
  Plug 'peitalin/vim-jsx-typescript'
  Plug 'patstockwell/vim-monokai-tasty'
call plug#end()

colorscheme vim-monokai-tasty 
autocmd BufNewFile,BufRead *.tsx,*.jsx,*.ts set filetype=typescriptreact


hi tsxTagName guifg=#66d8ef
hi tsxComponentName guifg=#66d8ef
hi tsxCloseComponentName guifg=#66d8ef
hi tsxCloseString guifg=#179af6
hi tsxCloseTag guifg=#179af6
hi tsxCloseTagName guifg=#179af6
hi tsxAttributeBraces guifg=#179af6
hi tsxEqual guifg=#179af6
hi tsxTypes guifg=#179af6 cterm=italic
hi WebBrowser ctermfg=204 guifg=#56B6C2
hi Events ctermfg=204 guifg=#56B6C2
hi tsxTypeBraces guifg=#e8296f
hi ReactProps guifg=#e8296f
hi ApolloGraphQL guifg=#e8296f
hi tsxAttrib guifg=#a7e22e cterm=italic
hi ReactState guifg=#a7e22e
hi ReduxKeywords ctermfg=204 guifg=#a7e22e
hi ReduxHooksKeywords ctermfg=204 guifg=#a7e22e
hi ReactLifeCycleMethods ctermfg=204 guifg=#a7e22e
hi Normal guibg=NONE ctermbg=NONE

let g:startify_custom_header = startify#pad(split(system('figlet -w 100 -l -f slant VIM21'), '\n'))
