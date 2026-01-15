
const { prisma } = require('../config/db');
const redis = require('../config/redis');

exports.getAllCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sortBy = 'createdAt', order = 'desc' } = req.query;
    const cacheKey = `courses:p${page}:l${limit}:s${search}:${sortBy}:${order}`;

    // Cek Redis
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const skip = (page - 1) * limit;
    const where = search ? {
      OR: [
        { title: { contains: search } },
        { description: { contains: search } }
      ]
    } : {};

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { [sortBy]: order },
        include: { createdBy: { select: { name: true } } }
      }),
      prisma.course.count({ where })
    ]);

    const result = {
      data: courses,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    };

    // Simpan ke Redis selama 5 menit
    await redis.setex(cacheKey, 300, JSON.stringify(result));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const thumbnail = req.files?.thumbnail ? req.files.thumbnail[0].path : null;
    const videoUrl = req.files?.video ? req.files.video[0].path : null;

    const course = await prisma.course.create({
      data: {
        title,
        description,
        thumbnail,
        videoUrl,
        createdById: req.user.id
      }
    });

    // Invalidate Cache
    const keys = await redis.keys('courses:*');
    if (keys.length > 0) await redis.del(keys);

    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCourse = async (req, res) => {
    // Implementasi Update...
    res.json({ message: 'Not implemented' });
};

exports.deleteCourse = async (req, res) => {
    // Implementasi Delete...
    res.json({ message: 'Not implemented' });
};
