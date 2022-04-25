# Fig pre block. Keep at the top of this file.
. "$HOME/.fig/shell/zshrc.pre.zsh"
# Environment variables
export NODE_ENV="development"
export PATH="/usr/local/bin:${PATH}"

# NVM
export NVM_DIR="$HOME/.nvm"
source $(brew --prefix nvm)/nvm.sh

# Python
alias python='python3'

# ZSH Variables
export ZSH="$HOME/.oh-my-zsh"
export ZSH_THEME="spaceship"

# ZSH Plugins
plugins=(git zsh-autosuggestions zsh-completions zsh-syntax-highlighting)
autoload -U compinit && compinit
source $ZSH/oh-my-zsh.sh

# ZSH Config
ENABLE_CORRECTION="true"

# Fig post block. Keep at the bottom of this file.
. "$HOME/.fig/shell/zshrc.post.zsh"
