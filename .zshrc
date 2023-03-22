# Environment variables
export NODE_ENV="development"
export PATH="/usr/local/bin:${PATH}"
export PATH="/usr/local/sbin:$PATH"
export STARSHIP_CONFIG=~/.config/starship.toml
export STARSHIP_CACHE=~/.starship/cache
export ANDROID_HOME=~/Library/Android/sdk/

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

# Starship
eval "$(starship init zsh)"

