import App from './app';

App.listen(App.get('port'), () => {
    console.log(`server ready on port:`,App.get('port'));
})