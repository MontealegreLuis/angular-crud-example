<?php
/**
 * PHP Version 7.1
 */

use Firebase\JWT\JWT;
use Symfony\Component\HttpFoundation\Request;

function checkToken(Request $request, string $key): bool
{
    if (!$request->headers->has('Authorization')) {
        return false;
    }

    $authorization = explode(' ', $request->headers->get("Authorization"));
    [$_, $jwt] = $authorization;
    $token = JWT::decode($jwt, $key, ['HS256']);

    return $token['role'] === 'admin';
}
