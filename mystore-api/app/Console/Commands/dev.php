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


        $this->info("Resetando banco de dados");
        $this->call('migrate:fresh');

        // $this->info('Inserindo user inicial');
        // $this->call('db:seed',['--class'=>'starter_user']);




        $this->info("Subindo server");
        $this->call('serve',["--port"=>7071]);
    }
}
