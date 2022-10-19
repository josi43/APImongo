const { getDb, conectaDB } = require("./db/conexao");
const express = require("express");
const { ObjectId } = require("mongodb");
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", async function (req, res) {
  const contatos = await getDb().collection("contatos").find({}).toArray();
  res.json(contatos);
});

app.get('/contatos/:id', async function(req, res){
    const contato= await getDb().collection('contatos').findOne({_id:ObjectId(req.params.id)})
    res.json(contato);
})

app.post('/',async function(res, req){
    const contatoNovo = await getDb().collection('contatos').insertOne(req.body);
    res.status(201).json(contatoNovo);
});

app.put('/:id',async function(req,res){
    await getDb()
    .collection('contatos')
    .uptadeOne(
        {_id:ObjectId(req.params.id)},
        {$set:req.body}
    );
    res.status(204).end();
});

app.delete('/contatos/:id', async function(req, res){
    await getDb().collection('contatos').deleteOne({ _id:ObjectId(req.params.id)});
    res.status(204).end();
})

conectaDB(() => {
  app.listen(port, () => console.log("api ta no ar"));
});
