using CustomerSale.DomainModel;
using CustomerSale.Repositories.Common.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace CustomerSale.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        readonly IOnBoardingDbUnitOfWork _OnBoardingDbUnitOfWork;

        public SalesController(IOnBoardingDbUnitOfWork OnBoardingDbUnitOfWork)
        {
            _OnBoardingDbUnitOfWork = OnBoardingDbUnitOfWork;
        }

        // POST api/<controller>  
        [HttpPost]
        public IActionResult Create(Sales sales)
        {
            try
            {
                _OnBoardingDbUnitOfWork.GetSalesRepository().Create(sales);
                if (sales == null)
                {
                    return NotFound("The Sales record couldn't able to add.");
                }
                return Ok(sales);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                IEnumerable<Sales> sales = _OnBoardingDbUnitOfWork.GetSalesRepository().GetAll();
                return Ok(sales);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }

        // GET api/<controller>/5 
        [HttpGet("{Id}")]
        public IActionResult GetById(int Id)
        {
            try
            {
                Sales sales = _OnBoardingDbUnitOfWork.GetSalesRepository().GetById(Id);
                if (sales == null)
                {
                    return NotFound("The Employee record couldn't be found.");
                }
                return Ok(sales);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }

        // GET api/<controller>/5 
        [HttpPost("{Id}")]
        public IActionResult Delete(int Id)
        {
            try
            {
                _OnBoardingDbUnitOfWork.GetSalesRepository().Delete(Id);
                if (Id == null)
                {
                    return NotFound("The Sales record couldn't able to delete.");
                }
                return Ok(Id);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }

        [HttpPost("{Id}")]
        public IActionResult Update(Sales salesChanges)
        {
            try
            {
                _OnBoardingDbUnitOfWork.GetSalesRepository().Update(salesChanges);
                if (salesChanges == null)
                {
                    return NotFound("The Sales record couldn't able to update.");
                }
                return Ok(salesChanges);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while processing request:" + ex.Message);
            }
        }

    }
}