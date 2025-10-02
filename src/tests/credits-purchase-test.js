/**
 * 积分套餐购买服务测试文件
 * 用于验证积分套餐购买流程的各个功能
 */

import { 
  getCreditPackages, 
  getCreditPackageByCode,
  createCreditPackageOrder, 
  checkOrderPaymentStatus,
  getUserOrderHistory,
  calculateCustomCreditsPrice
} from '../services/creditsService.js'

import { 
  PACKAGE_TYPES, 
  PAYMENT_METHODS, 
  ORDER_STATUS,
  validateCreditPackage,
  validatePurchaseOrder,
  createStandardPackage,
  createCustomPackage
} from '../types/credits.js'

/**
 * 测试积分套餐查询功能
 */
async function testGetCreditPackages() {
  console.log('🧪 测试：获取积分套餐列表')
  
  try {
    const result = await getCreditPackages()
    console.log('✅ 获取积分套餐列表成功:', result)
    
    // 验证返回数据结构
    if (result.success && result.data && Array.isArray(result.data)) {
      console.log(`📊 共获取到 ${result.data.length} 个积分套餐`)
      
      // 验证每个套餐的数据结构
      result.data.forEach((pkg, index) => {
        const isValid = validateCreditPackage(pkg)
        console.log(`  套餐 ${index + 1}: ${pkg.packageName} - ${isValid ? '✅ 有效' : '❌ 无效'}`)
        
        if (!isValid) {
          console.warn('    无效套餐数据:', pkg)
        }
      })
    } else {
      console.warn('⚠️ 返回数据格式异常:', result)
    }
    
    return result
  } catch (error) {
    console.error('❌ 获取积分套餐列表失败:', error)
    return { success: false, error: error.message }
  }
}

/**
 * 测试单个积分套餐查询功能
 */
async function testGetCreditPackageByCode() {
  console.log('🧪 测试：获取单个积分套餐详情')
  
  const testCodes = ['CREDITS_500', 'CREDITS_1000', 'CREDITS_CUSTOM']
  
  for (const code of testCodes) {
    try {
      console.log(`  测试套餐代码: ${code}`)
      const result = await getCreditPackageByCode(code)
      
      if (result.success && result.data) {
        console.log(`  ✅ 获取套餐 ${code} 成功:`, result.data.packageName)
        
        const isValid = validateCreditPackage(result.data)
        console.log(`  数据验证: ${isValid ? '✅ 有效' : '❌ 无效'}`)
      } else {
        console.log(`  ⚠️ 获取套餐 ${code} 失败:`, result.error)
      }
    } catch (error) {
      console.error(`  ❌ 获取套餐 ${code} 异常:`, error)
    }
  }
}

/**
 * 测试订单创建功能
 */
async function testCreateCreditPackageOrder() {
  console.log('🧪 测试：创建积分套餐订单')
  
  // 测试标准套餐订单
  const standardOrderData = {
    packageCode: 'CREDITS_500',
    customerName: '测试用户',
    customerEmail: 'test@example.com',
    paymentMethod: PAYMENT_METHODS.WECHAT_PAY
  }
  
  console.log('  测试标准套餐订单创建...')
  const isValidStandard = validatePurchaseOrder(standardOrderData)
  console.log(`  订单数据验证: ${isValidStandard ? '✅ 有效' : '❌ 无效'}`)
  
  if (isValidStandard) {
    try {
      const result = await createCreditPackageOrder(standardOrderData)
      console.log('  ✅ 标准套餐订单创建结果:', result)
      
      if (result.success && result.data) {
        console.log(`    订单ID: ${result.data.orderId}`)
        console.log(`    支付金额: ¥${result.data.paymentInfo?.amount}`)
        console.log(`    支付方式: ${result.data.paymentInfo?.paymentMethod}`)
      }
    } catch (error) {
      console.error('  ❌ 标准套餐订单创建失败:', error)
    }
  }
  
  // 测试自定义套餐订单
  const customOrderData = {
    packageCode: 'CREDITS_CUSTOM',
    customerName: '测试用户2',
    customerEmail: 'test2@example.com',
    paymentMethod: PAYMENT_METHODS.ALIPAY,
    customCredits: 300
  }
  
  console.log('  测试自定义套餐订单创建...')
  const isValidCustom = validatePurchaseOrder(customOrderData)
  console.log(`  订单数据验证: ${isValidCustom ? '✅ 有效' : '❌ 无效'}`)
  
  if (isValidCustom) {
    try {
      const result = await createCreditPackageOrder(customOrderData)
      console.log('  ✅ 自定义套餐订单创建结果:', result)
      
      if (result.success && result.data) {
        console.log(`    订单ID: ${result.data.orderId}`)
        console.log(`    积分数量: ${customOrderData.customCredits}`)
        console.log(`    支付金额: ¥${result.data.paymentInfo?.amount}`)
      }
    } catch (error) {
      console.error('  ❌ 自定义套餐订单创建失败:', error)
    }
  }
}

/**
 * 测试订单状态查询功能
 */
async function testCheckOrderPaymentStatus() {
  console.log('🧪 测试：查询订单支付状态')
  
  // 使用模拟订单ID进行测试
  const testOrderIds = ['test-order-001', 'test-order-002', 'nonexistent-order']
  
  for (const orderId of testOrderIds) {
    try {
      console.log(`  查询订单: ${orderId}`)
      const result = await checkOrderPaymentStatus(orderId)
      
      if (result.success && result.data) {
        console.log(`  ✅ 订单状态: ${result.data.status}`)
        console.log(`    支付金额: ¥${result.data.amount}`)
        if (result.data.paidAt) {
          console.log(`    支付时间: ${result.data.paidAt}`)
        }
      } else {
        console.log(`  ⚠️ 查询失败: ${result.error}`)
      }
    } catch (error) {
      console.error(`  ❌ 查询订单 ${orderId} 异常:`, error)
    }
  }
}

/**
 * 测试用户订单历史查询功能
 */
async function testGetUserOrderHistory() {
  console.log('🧪 测试：查询用户订单历史')
  
  const testEmails = ['test@example.com', 'user@test.com', 'nonexistent@example.com']
  
  for (const email of testEmails) {
    try {
      console.log(`  查询用户: ${email}`)
      const result = await getUserOrderHistory(email, { page: 0, size: 10 })
      
      if (result.success && result.data) {
        console.log(`  ✅ 查询成功，共 ${result.data.totalElements} 条订单`)
        
        if (result.data.content && result.data.content.length > 0) {
          result.data.content.forEach((order, index) => {
            console.log(`    订单 ${index + 1}: ${order.orderId} - ${order.status} - ¥${order.amount}`)
          })
        } else {
          console.log('    📝 暂无订单记录')
        }
      } else {
        console.log(`  ⚠️ 查询失败: ${result.error}`)
      }
    } catch (error) {
      console.error(`  ❌ 查询用户 ${email} 订单历史异常:`, error)
    }
  }
}

/**
 * 测试数据模型和工具函数
 */
function testDataModelsAndUtils() {
  console.log('🧪 测试：数据模型和工具函数')
  
  // 测试创建标准套餐
  console.log('  测试创建标准套餐...')
  const standardPackage = createStandardPackage({
    packageCode: 'TEST_CREDITS_100',
    packageName: '测试套餐',
    packageDescription: '用于测试的积分套餐',
    credits: 100,
    price: 5.0,
    features: ['100积分', '测试专用'],
    isPopular: false
  })
  
  const isValidStandard = validateCreditPackage(standardPackage)
  console.log(`  ✅ 标准套餐创建: ${isValidStandard ? '有效' : '无效'}`)
  console.log('    套餐信息:', standardPackage.packageName, standardPackage.credits, '积分')
  
  // 测试创建自定义套餐
  console.log('  测试创建自定义套餐...')
  const customPackage = createCustomPackage({
    minCredits: 50,
    maxCredits: 5000,
    costPerCredit: 0.04
  })
  
  const isValidCustom = validateCreditPackage(customPackage)
  console.log(`  ✅ 自定义套餐创建: ${isValidCustom ? '有效' : '无效'}`)
  console.log('    套餐信息:', customPackage.packageName, `${customPackage.minCredits}-${customPackage.maxCredits}积分`)
  
  // 测试价格计算
  console.log('  测试自定义积分价格计算...')
  const testCredits = [100, 500, 1000, 2000]
  testCredits.forEach(credits => {
    const price = calculateCustomCreditsPrice(credits)
    console.log(`    ${credits}积分 = ¥${price}`)
  })
}

/**
 * 运行所有测试
 */
export async function runAllTests() {
  console.log('🚀 开始积分套餐购买服务测试')
  console.log('=' .repeat(50))
  
  try {
    // 1. 测试数据模型和工具函数
    testDataModelsAndUtils()
    console.log('')
    
    // 2. 测试积分套餐查询
    await testGetCreditPackages()
    console.log('')
    
    // 3. 测试单个套餐查询
    await testGetCreditPackageByCode()
    console.log('')
    
    // 4. 测试订单创建
    await testCreateCreditPackageOrder()
    console.log('')
    
    // 5. 测试订单状态查询
    await testCheckOrderPaymentStatus()
    console.log('')
    
    // 6. 测试用户订单历史查询
    await testGetUserOrderHistory()
    console.log('')
    
    console.log('✅ 所有测试完成')
    console.log('=' .repeat(50))
    
  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error)
  }
}

/**
 * 快速测试函数（用于开发调试）
 */
export async function quickTest() {
  console.log('⚡ 快速测试积分套餐功能')
  
  // 只测试基础功能
  await testGetCreditPackages()
  testDataModelsAndUtils()
  
  console.log('⚡ 快速测试完成')
}

// 如果直接运行此文件，执行所有测试
if (typeof window !== 'undefined' && window.location) {
  // 在浏览器环境中，可以通过控制台调用测试函数
  window.testCreditsService = {
    runAllTests,
    quickTest,
    testGetCreditPackages,
    testGetCreditPackageByCode,
    testCreateCreditPackageOrder,
    testCheckOrderPaymentStatus,
    testGetUserOrderHistory,
    testDataModelsAndUtils
  }
  
  console.log('💡 积分套餐测试函数已加载到 window.testCreditsService')
  console.log('💡 使用 window.testCreditsService.runAllTests() 运行所有测试')
  console.log('💡 使用 window.testCreditsService.quickTest() 运行快速测试')
}
