SC.initialize({
    client_id: '643430bc7251b18258461c3cee6040f8',
    redirect_uri: 'http://localhost/onequeue/includes/callback.html'
});

function scConnect() {
    SC.connect().then(function() {
        return SC.get('/me');
    });
};