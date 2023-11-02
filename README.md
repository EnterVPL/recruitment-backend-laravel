# Laravel Books

## Requirements

- Composer 2
- PHP 8.2
- Docker, Docker Compose

## How to run

### First run

1. Start docker daemon
1. Run `composer install`
1. Do sail alias by command `alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'`
1. Resolve filesystem permissions (eg. `sudo chmod o+rw -R ./`)
1. Run `sail build`
1. Run `sail up -d`
1. Run `sail npm install`
1. Run `sail artisan migrate`
1. Run `sail artisan db:seed` to create 1 test user, 10 categories and 20 books
1. Run `sail npm run dev`
1. Open browser at <http://localhost/>

### Other runs

1. Run `sail up -d`
1. Run `sail npm run dev`
1. Open browser at <http://localhost/>

## Postman

All postamn collections you find in the `postman_collections` directory
