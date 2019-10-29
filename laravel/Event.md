# Создание событий и регистрация слушателей

Для создания события и слушателя(ей) добавляем его в EventServiceProvider и вызываем генератор: 
```php
php artisan event:generate
```
События и слушатели созданные ранее не изменятся.

Пример добавления:

```php
/**
 * The event listener mappings for the application.
 *
 * @var array
 */
protected $listen = [
    'App\Events\OrderShipped' => [
        'App\Listeners\SendShipmentNotification',
    ],
];
```

## Сщздание события основанное на замыкании

```php
/**
 * Register any other events for your application.
 *
 * @return void
 */
public function boot()
{
    parent::boot();

    Event::listen('event.name', function ($foo, $bar) {
        //
    });
}
```
## Зарегистрировать слушателя на несколько событий в ручную

```php
Event::listen('event.*', function ($eventName, array $data) {
    //
});
```

## Автоматическое обнаружение событий 

Вместо регистрации событий и прослушивателей вручную в ```$listen``` массиве ```EventServiceProvider```, вы можете включить автоматическое обнаружение событий. 
Когда обнаружение событий включено, Laravel автоматически найдет и зарегистрирует ваши события и слушателей, отсканировав ```Listeners``` каталог вашего приложения. 
Кроме того, любые явно определенные события, перечисленные в, ```EventServiceProviderвсе``` равно будут зарегистрированы.

По умолчанию обнаружение событий отключено, но вы можете включить его, переопределив ```shouldDiscoverEvents``` метод вашего приложения ```EventServiceProvider```:

```php
/**
 * Determine if events and listeners should be automatically discovered.
 *
 * @return bool
 */
public function shouldDiscoverEvents()
{
    return true;
}
```

## Смена директории с прослушивателями


```php
/**
 * Get the listener directories that should be used to discover events.
 *
 * @return array
 */
protected function discoverEventsWithin()
{
    return [
        $this->app->path('Listeners'),
    ];
}
```

## Проверка всех слушателей

Для выкатки в прод для ускорения регистрации событий надо 
```php artisan event:cache```


```php
php artisan event:clear
```

Отображение всех событий и слушателей:
```php
php artisan event:listener
```
