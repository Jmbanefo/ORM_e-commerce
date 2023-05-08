const router = require('express').Router();
const { json } = require('../../config/connection');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {

  try{ 
    const tag_data = await Tag.findAll({ 
      include: [{ model: Product}], 
    }); 

    res.status(200).json(tag_data); 
  } 
  catch (error) { 
    res.status(500).json(error)
  }
});


router.get('/:id', async (req, res) => {
  
  try{ 
    const tag_data = await Tag.findByPk (req.params.id, { 
      include: [{model: Product}], 
    }); 
    if (!tag_data) { 
      res.status(404).json({message: "Unable to find a tag with that ID"}); 
      return;
    }
    res.status(200).json(tag_data); 
  }
  catch (error) { 
    res.status(500).json(error)
  }
});


router.post('/', async (req, res) => {
  
  try{ 
    const tag_data = await Tag.create(req.body); 
    res.status(200).json(tag_data); 
  } catch (error) { 
    res.status(400).json(error)
  }
});

router.put('/:id', async (req, res) => {

  try{ 
    const tag_data = await Tag.update(req.body, 
      { 
        where: { id: req.params.id}
    })
    if(!tag_data) { 
      res.status(400).json({message: "Unable to find a tag with that ID"})
      return; 
    }
    res.status(200).json(tag_data)
  }
  catch (error) { 
    res.status(500).json(error); 
  }
});

router.delete('/:id', async (req, res) => {

  try{ 
    const tag_data = await Tag.destroy({ 
      where: { id: req.params.id},
    })
    if (!tag_data){ 
      res.status(400).json({ message: "Unable to find a tag with that ID"})
    }
    res.status(200).json(tag_data); 
  }
  catch (error) { 
    res.status(500).json(error)
  }
});

module.exports = router;
