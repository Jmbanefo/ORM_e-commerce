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

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
