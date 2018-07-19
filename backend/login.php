<?php
/**
 * PHP Version 7.1
 */

use Firebase\JWT\JWT;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require __DIR__ . '/vendor/autoload.php';

$request = Request::createFromGlobals();

if ($request->isMethod(Request::METHOD_OPTIONS)) {
    $response = new Response();
    $response->headers->set('Allow', 'POST');
} else {
    ['username' => $username, 'password' => $password] = json_decode($request->getContent(), true);

    $users = new Users();
    $user = $users->withUsername($username);

    if (!$user->matchesPassword($password)) {
        $response = new Response('', 401);
    } else {
        $token = [
            'iss' => $request->server->get('SERVER_NAME'),
            'exp' => time() + (60 * 120), // 2 hours
            'nbf' => time(),
            'uid' => $user->username(),
            'role' => 'admin',
        ];
        $response = new JsonResponse(['token' => JWT::encode($token, KEY)]);
    }
}

$response->prepare($request);
$response->send();
