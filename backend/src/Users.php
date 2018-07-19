<?php
/**
 * PHP Version 7.1
 */

class Users
{
    /** @var array */
    private $users;

    public function __construct()
    {
        $this->users = [
            User::withCredentials('luis', 'ilovemyjob'),
        ];
    }

    public function withUsername($username): ?User
    {
        /** @var User $user */
        foreach ($this->users as $user) {
            if ($user->hasUsername($username)) {
                return $user;
            }
        }
        return null;
    }
}
