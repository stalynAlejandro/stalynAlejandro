let mapleader = "."
:syntax sync fromstart
:set nowrap
"Not record
map q <Nop>  

"autocmd BufNewFile,BufRead *.md set wrap
"autocmd BufEnter * :syntax sync fromstart
"filetype off        			  "Helps force plugins to load  
"filetype plugin indent on	"For plugins to load correctly

set nocompatible
set showcmd
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
set splitbelow
set splitright
set hlsearch
set incsearch
set ignorecase

autocmd InsertEnter * set cul
autocmd InsertLeave * set nocul
autocmd VimEnter * NERDTree | wincmd p

map <C-t> :let $VIM_DIR=expand('%:p:h')<CR>:bel terminal<CR>cd $VIM_DIR<CR> <C-w>5+
nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <leader>t :NERDTreeToggle<CR>
nnoremap <leader>f :NERDTreeFind<CR>
nnoremap <leader>r :NERDTree<CR>

nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-h> <C-w>h
nnoremap <C-l> <C-w>l

noremap <leader>w :w<CR>
noremap <leader>wa :wqa!<CR> 		
noremap <leader>x :x<CR> 		
noremap <leader>qq :q!<CR> 
noremap <leader>qa :qa!<CR> 
noremap <leader>l :let @/=''<CR>

inoremap jj <Esc>
inoremap <leader>w <Esc>:w<CR> 
inoremap <leader>wa <Esc>:wqa!<CR> 
inoremap <leader>qq <Esc>:q!<CR>
inoremap <leader>qa :qa!<CR> 

nnoremap <silent> <Leader>f :Rg<CR>
nnoremap <silent> <Leader>ff :Files<CR>
nnoremap <silent> <Leader>b :Buffers<CR>
nnoremap <silent> <Leader>/ :BLines<CR>
nnoremap <silent> <Leader>' :Marks<CR>
nnoremap <silent> <Leader>g :Commits<CR>
nnoremap <silent> <Leader>H :Helptags<CR>
nnoremap <silent> <Leader>hh :History<CR>
nnoremap <silent> <Leader>h: :History:<CR>
nnoremap <silent> <Leader>h/ :History/<CR> 

map <silent> <C-g>s :Gdiffsplit<CR>
map <silent> <C-g>w :Gwrite<CR>
map <silent> <C-g>r :Gread<CR>

nnoremap <leader>p :call CocAction('runCommand','prettier.formatFile')<CR>
inoremap <silent><expr> <tab> pumvisible() ? coc#_select_confirm() : "\<C-g>u\<TAB>"
inoremap <silent><expr> <cr> "\<c-g>u\<CR>"

let g:coc_user_config = {}
let g:coc_user_config['coc.preferences.jumpCommand'] = ':vsplit'
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

call plug#begin('~/.vim/plugged') 
  Plug 'mhinz/vim-startify'
  Plug 'itchyny/lightline.vim'
  Plug 'vim-airline/vim-airline'
  Plug 'tpope/vim-fugitive'                                     "Github
  Plug 'rrethy/vim-hexokinase', { 'do': 'make hexokinase' }     "Colors
  Plug 'junegunn/fzf.vim'                                       "Search Files
  Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
  Plug 'neoclide/coc.nvim', { 'branch': 'release' }             "Snippet and Additional Text Editing Support
  Plug 'preservim/nerdtree'                                     "NerdTree Plugins
  Plug 'Xuyuanp/nerdtree-git-plugin'                            "Showing git status flags
  Plug 'dracula/vim', { 'as': 'dracula' }                       "Themes
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
