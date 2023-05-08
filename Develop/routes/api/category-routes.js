const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  
  try{ 
    const category_data = await Category.findAll({ 
      include : [{ model: Product}], 
    }); 
    res.status(200).json(category_data); 
  } catch (error) { 
    res.status(500).json(error); 
  }

});

router.get('/:id', async (req, res) => {

  try{ 
    const category_data = await Category.findByPk( req.params.id, { 
      include : [{ model: Product}], 
    }); 
    if(!category_data){ 
      res.status(400).json({message: "Unable to find the Category with that ID"}); 
      return; 
    }
    res.status(200).json(category_data); 
  } catch (error) { 
    res.status(500).json(error); 
  }

});

router.post('/', async (req, res) => {

  try{ 
    const category_data = await Category.create(req.body); 
    res.status(201).json(category_data); 
  } catch (error) { 
    res.status(400).json(error); 
  }
});

router.put('/:id', async (req, res) => {

  try{ 
    const category_data = await Category.update({ 
      category_name: req.body.category_name, 
    }, 
    { 
      where: { 
        id: req.params.id, 
      }
    })
    if(!category_data){ 
      res.status(404).json({message: "Unable to find the Category with this ID"}); 
    } res.status(200).json(category_data); 
  }
    catch (error) { 
      res.status(500).json(error); 
    }
});

router.delete('/:id', async (req, res) => {
  
  try{ 
    const category_data = await Category.destroy({ 
      where: { 
        id: req.params.id, 
      }
    }); 
    if (!category_data){ 
      res.status(404).json({message: "Unable to find the Category with this ID"})
      return; 
    }
    res.status(200).json(category_data); 
  } catch (error){ 
    res.status(500).json(error); 
  }
});

module.exports = router;
