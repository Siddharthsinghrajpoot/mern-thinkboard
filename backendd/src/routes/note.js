import express from 'express';
import NoteModel from '../config/db.js';
const router = express.Router();

router.get('/getall', async (req, res) => {
  try{
const notes=await NoteModel.find().sort({createdAt:-1});
res.status(200).json(notes)
  }
catch(error){
console.error("Error in getalnotes controller");
res.status(500).json({massage:"Internal server error"})
}

});

router.get('/getbyid/:id', async(req, res)=>{
try{

const id=req.params.id;
const singlenode= await NoteModel.findById(id)
if(!singlenode){
res.status(404).json({massage:"not found"})

}

res.status(200).json(singlenode)


}

catch(error){
console.error("error in getbyid node controller",error)
res.status(500).json({massage:"not found"})

}
})




router.post('/div', async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const response = await NoteModel.create({
      title,
      content,
    });
    res.status(200).json({
      massage: response,
    });
  } catch (error) {
    console.error('Error in createNode controller', error);
    res.status(500).json({ message: 'internal server error' });
  }
});

router.put('/update/:id', async (req, res) => {
 try{ const title = req.body.title;
  const content = req.body.content;
  const id = req.params.id;
  const newnode = await NoteModel.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );
if(!newnode) return res.status(404).json({message:"Note not found"});

res.status(200).json({massage:newnode});


}

catch (error){
console.error("error in update node controller",error)
res.status(500).json({message:"internal server error"})
}


});

router.delete('/delete/:id', async(req, res) => {
const id=req.params.id;
const deletenote=await NoteModel.findByIdAndDelete(id)

try{
if(!deletenote)return res.status(404).json({massage:"delete node is node found"})

res.status(200).json({massage:"nodo is delete"})
}
catch (error){
console.error("error in delete node controller ",error)
res.status(500).json({message:"internal server error"})

}

});

export default router;
