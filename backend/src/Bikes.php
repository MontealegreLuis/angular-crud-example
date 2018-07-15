<?php
/**
 * PHP Version 7.1
 */

class Bikes
{
    private static $filename = __DIR__ . '/../bikes.json';

    /** @var array */
    private $bikes;

    public function __construct()
    {
        $this->bikes = json_decode(file_get_contents(self::$filename), true);
    }

    public function all(): array
    {
        return $this->bikes;
    }

    public function withId(int $id): array
    {
        $bike = array_filter($this->bikes, function ($bike) use ($id) {
            return $bike['id'] == $id;
        });
        return array_pop($bike);
    }

    public function add(array $bike): array
    {
        $bike['id'] = count($this->bikes) + 1;
        $this->bikes[] = $bike;

        $this->saveBikes();

        return $bike;
    }

    public function update(array $updatedBike): array
    {
        $this->bikes = array_map(function (array $bike) use ($updatedBike) {
            if ($bike['id'] == $updatedBike['id']) {
                return $updatedBike;
            }
            return $bike;
        }, $this->bikes);

        $this->saveBikes();

        return $updatedBike;
    }

    public function delete(int $id): void
    {
        $this->bikes = array_values(array_filter($this->bikes, function (array $bike) use ($id) {
            return $bike['id'] != $id;
        }));
        $this->saveBikes();
    }

    private function saveBikes(): void
    {
        file_put_contents(self::$filename, json_encode($this->bikes, JSON_PRETTY_PRINT));
    }
}
