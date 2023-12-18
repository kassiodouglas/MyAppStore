<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class dev extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dev';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando geral para desenvolviemento';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $env = env('APP_ENV');
        $this->warn("\n-------------------AMBIENTE EXECUTADO: $env");












        $this->call('serve',["--port"=>7071]);
    }
}
