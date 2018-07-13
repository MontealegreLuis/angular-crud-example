<?php
/**
 * PHP Version 7.1
 */

class Bikes
{
    private $bikes;

    public function __construct()
    {
        $this->bikes = json_decode(file_get_contents(__DIR__ . '/../bikes.json'), true);
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
}
