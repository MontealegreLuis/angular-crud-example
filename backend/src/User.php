<?php
/**
 * PHP Version 7.1
 */
class User
{
    /** @var string */
    private $username;

    /** @var string */
    private $pasword;

    public static function withCredentials(string $username, string $password)
    {
        return new User($username, $password);
    }

    public function username(): string
    {
        return $this->username;
    }

    public function hasUsername(string $username): bool
    {
        return $this->username === $username;
    }
    
    public function matchesPassword(string $password): bool
    {
        return $this->pasword === $password;
    }

    private function __construct(string $username, string $pasword)
    {
        $this->username = $username;
        $this->pasword = $pasword;
    }
}
