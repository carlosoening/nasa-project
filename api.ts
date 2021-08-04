import { Router } from 'https://deno.land/x/oak@v8.0.0/mod.ts';

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = `
    {___     {__     {_       {__ __      {_       
    {_ {__   {__    {_ __   {__    {__   {_ __     
    {__ {__  {__   {_  {__   {__        {_  {__    
    {__  {__ {__  {__   {__    {__     {__   {__   
    {__   {_ {__ {______ {__      {__ {______ {__  
    {__    {_ __{__       {_{__    {_{__       {__ 
    {__      {_{__         {__{__ __{__         {__
                Mission Control API`;
});

export default router;