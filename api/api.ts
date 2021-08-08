import { Router } from '../deps.ts';
import launches from './routes/launches.ts';
import planets from './routes/planets.ts';

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

router.use(launches.routes())
.use(planets.routes());

export default router;