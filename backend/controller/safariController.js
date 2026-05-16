import Safari from '../models/Safari.js';

export const createSafari = async (req, res) => {
  try {
    const { name, duration, price, difficulty, image, description, highlights, included, notIncluded, bestFor, itinerary } = req.body;

    const safari = new Safari({
      name,
      duration,
      price,
      difficulty,
      image,
      description,
      highlights,
      included,
      notIncluded,
      bestFor,
      itinerary,
      createdBy: req.userId,
    });

    await safari.save();
    res.status(201).json({ message: 'Safari created successfully', safari });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllSafaris = async (req, res) => {
  try {
    const safaris = await Safari.find().populate('createdBy', 'userName email');
    res.status(200).json({ safaris });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSafariById = async (req, res) => {
  try {
    const safari = await Safari.findById(req.params.id).populate('createdBy', 'userName email');
    if (!safari) {
      return res.status(404).json({ message: 'Safari not found' });
    }
    res.status(200).json({ safari });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateSafari = async (req, res) => {
  try {
    const safari = await Safari.findById(req.params.id);
    if (!safari) {
      return res.status(404).json({ message: 'Safari not found' });
    }

    if (safari.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this safari' });
    }

    Object.assign(safari, req.body);
    await safari.save();
    res.status(200).json({ message: 'Safari updated successfully', safari });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteSafari = async (req, res) => {
  try {
    const safari = await Safari.findById(req.params.id);
    if (!safari) {
      return res.status(404).json({ message: 'Safari not found' });
    }

    if (safari.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this safari' });
    }

    await Safari.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Safari deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
